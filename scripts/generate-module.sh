#!/bin/sh

# Usage:
#   chmod +x scripts/generate-module.sh
#   ./scripts/generate-module.sh <module-name>
#
# Example:
#   ./scripts/generate-module.sh user-profiles

set -eu

# Resolve project root relative to this script
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")

cd "$PROJECT_ROOT"

NAME="${1:?Usage: ./scripts/command.sh <module-name>}"

DIR="backend/src/modules/$NAME"

if [ -d "$DIR" ]; then
  echo "Module already exists: $DIR"
  exit 1
fi

# Convert kebab-case to PascalCase
CLASS_NAME=$(printf '%s' "$NAME" | awk -F- '{
  for (i = 1; i <= NF; i++) {
    $i = toupper(substr($i, 1, 1)) substr($i, 2)
  }
  print $0
}')

# Create directories
mkdir -p "$DIR/dao" "$DIR/use-cases" "$DIR/tests" "$DIR/dto"

# Generate module
cat > "$DIR/$NAME.module.ts" <<EOF
import { Module } from '@nestjs/common';
import { ${CLASS_NAME}Controller } from './${NAME}.controller.js';
import { ${CLASS_NAME}Dao } from './dao/${NAME}.dao.js';
import { ${CLASS_NAME}UseCase } from './use-cases/${NAME}.use-case.js';

@Module({
  controllers: [${CLASS_NAME}Controller],
  providers: [${CLASS_NAME}Dao, ${CLASS_NAME}UseCase],
})
export class ${CLASS_NAME}Module {}
EOF

# Generate controller
cat > "$DIR/$NAME.controller.ts" <<EOF
import { Controller } from '@nestjs/common';

@Controller('$NAME')
export class ${CLASS_NAME}Controller {}
EOF

# Generate DAO
cat > "$DIR/dao/$NAME.dao.ts" <<EOF
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../prisma/prisma.provider.js';

@Injectable()
export class ${CLASS_NAME}Dao {
  constructor(private readonly prisma: PrismaProvider) {}
}
EOF

# Generate DTO
cat > "$DIR/dto/create-$NAME.dto.ts" <<EOF
import { ApiProperty } from '@nestjs/swagger';

export class Create${CLASS_NAME}Dto {}
EOF

cat > "$DIR/dto/update-$NAME.dto.ts" <<EOF
import { ApiPropertyOptional } from '@nestjs/swagger';

export class Update${CLASS_NAME}Dto {}
EOF

# Generate use-case
cat > "$DIR/use-cases/$NAME.use-case.ts" <<EOF
import { Injectable } from '@nestjs/common';
import { ${CLASS_NAME}Dao } from '../dao/${NAME}.dao.js';

@Injectable()
export class ${CLASS_NAME}UseCase {
  constructor(private readonly ${NAME}Dao: ${CLASS_NAME}Dao) {}
}
EOF

# Generate test files
touch "$DIR/tests/$NAME-int.spec.ts"
touch "$DIR/tests/$NAME-unit.spec.ts"

echo "Created module: $DIR"
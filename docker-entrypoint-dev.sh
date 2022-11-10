#!/bin/bash
set -e

# This script is intended to be used in development environments only!
pnpm install
pnpm "$@"

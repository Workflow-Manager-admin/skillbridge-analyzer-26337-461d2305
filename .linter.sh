#!/bin/bash
cd /home/kavia/workspace/code-generation/skillbridge-analyzer-26337-461d2305/skillbridge_analyzer
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


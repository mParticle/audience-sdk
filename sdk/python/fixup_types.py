#!/usr/bin/env python3

"""
Script to fix RootModel[...] types by wrapping the content in quotes.
Handles both single-line and multi-line type definitions.
Usage: python fixup_types.py <file_or_directory>
"""

from collections.abc import Iterable
import sys
import os
import re
import argparse
from pathlib import Path

ROOT_MODEL_TEXT = "RootModel["

def quote_root_model_types(lines: Iterable[str]) -> Iterable[str]:
    bracket_count = 0
    acc_line = ""
    for line in lines:
        cur_idx = 0
        if bracket_count == 0:
            root_model_idx = line.find(ROOT_MODEL_TEXT)

            if root_model_idx == -1:
                yield line
                continue

            cur_idx = root_model_idx + len(ROOT_MODEL_TEXT)
            bracket_count = 1
            yield line[:cur_idx]

        for i in range(cur_idx, len(line)):
            c = line[i]

            if c == "[":
                bracket_count += 1
            elif c == "]":
                bracket_count -= 1

            if bracket_count == 0:
                cleaned_line = re.sub(r'[ \t]+', " ", acc_line).replace("\n", "").strip()
                yield f'"{cleaned_line}"]' + line[i + 1:]
                acc_line = ""
                break

            else:
                acc_line += c


def process_file(file_path: Path):
    """Process a single Python file."""
    print(f"Processing: {file_path}")
    
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            original_lines = f.readlines()
        
        # Fix RootModel types
        fixed_lines = list(quote_root_model_types(original_lines))
        
        if original_lines != fixed_lines:
            # Write the fixed content back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.writelines(fixed_lines)
            
        else:
            print(f"  - No RootModel types found in {file_path}")
            
    except Exception as e:
        print(f"   Error processing {file_path}: {e}")


def main():
    parser = argparse.ArgumentParser(
        description="Fix RootModel[...] types by wrapping content in quotes"
    )
    parser.add_argument(
        'target', 
        help='File or directory to process'
    )
    parser.add_argument(
        '--dry-run', 
        action='store_true', 
        help='Show what would be changed without making changes'
    )
    
    args = parser.parse_args()
    target_path = Path(args.target)
    
    if not target_path.exists():
        print(f"Error: {target_path} does not exist")
        sys.exit(1)
    
    if target_path.is_file():
        # Single file
        if target_path.suffix == '.py':
            process_file(target_path)
        else:
            print(f"Warning: {target_path} is not a Python file")

    elif target_path.is_dir():
        # Directory - find all .py files
        print(f"Searching for Python files in: {target_path}")
        py_files = list(target_path.rglob('*.py'))
        
        if not py_files:
            print("No Python files found")
            return
        
        for py_file in py_files:
            process_file(py_file)

    else:
        print(f"Error: {target_path} is neither a file nor a directory")
        sys.exit(1)
    
    print("Done!")


if __name__ == "__main__":
    main() 

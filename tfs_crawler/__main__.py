import argparse
import yaml
import logging
import sys
import os
from tfs_crawler.crawler.engine import Crawler
from tfs_crawler.export.json_exporter import JsonExporter

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler('crawler.log')
        ]
    )

def load_config(config_path):
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)

def crawl_command(args):
    config = load_config(args.config)
    crawler = Crawler(config)
    crawler.start()

def export_command(args):
    config = load_config(args.config)
    exporter = JsonExporter(config)
    exporter.export_all()

def validate_command(args):
    config = load_config(args.config)
    print("Config is valid.")
    # Add more validation logic if needed
    
def main():
    setup_logging()
    
    parser = argparse.ArgumentParser(description="TFS Crawler CLI")
    parser.add_argument('--config', default='config.yaml', help='Path to config file')
    
    subparsers = parser.add_subparsers(dest='command', required=True)
    
    crawl_parser = subparsers.add_parser('crawl', help='Start crawling')
    crawl_parser.set_defaults(func=crawl_command)
    
    export_parser = subparsers.add_parser('export', help='Export data to JSON')
    export_parser.set_defaults(func=export_command)
    
    validate_parser = subparsers.add_parser('validate', help='Validate configuration')
    validate_parser.set_defaults(func=validate_command)
    
    args = parser.parse_args()
    args.func(args)

if __name__ == '__main__':
    main()

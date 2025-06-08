# App: Client Profile Module
# Package: root
# File: Makefile
# Version: 0.0.11
# Author: Bobwares
# Date: 2025-06-08T10:30:00Z
# Description: Root makefile to manage install, build, start and test across packages.
#
.PHONY: install build start test

install:
	$(MAKE) -C api install
	$(MAKE) -C ui install
	$(MAKE) -C mobile install

build:
	$(MAKE) -C api build
	$(MAKE) -C ui build
	$(MAKE) -C mobile build

start:
	$(MAKE) -C api start &
	$(MAKE) -C ui start &
	$(MAKE) -C mobile start &

# Basic test aggregator

test:
	$(MAKE) -C api test
	$(MAKE) -C ui test
	$(MAKE) -C mobile test

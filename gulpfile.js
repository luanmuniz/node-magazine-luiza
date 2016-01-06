'use strict';
let requireDir = require('require-dir');
requireDir('./gulp-config/core');
requireDir('./gulp-config/tasks', { recurse: true });

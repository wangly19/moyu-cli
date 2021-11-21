#!/usr/bin/env node

import { program } from "commander";
import { version } from "@@/package.json";
import main from '@/yapi'

program
  .command("yapi")
  .description("yapi相关内容，详情查看前端团队语雀文档")
  .option("--ts, --typescript", "创建TypeScript相关类型声明")
  .option("--f, --fore", "强制覆盖本地所有接口")
  .action((options) => {
    main(options?.typescript)
  });

program.version(`v${version}`).parse(process.argv);

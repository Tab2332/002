# 树洞留言板

一个简单的匿名留言板应用，基于Next.js 14和Vercel构建。

## 功能特点

- 匿名留言：无需注册即可发送留言
- 收信人查询：通过姓名查看收到的留言
- 实时反馈：提交后立即生成留言ID
- 分页加载：支持大量留言的高效浏览
- 响应式设计：完美支持移动端和桌面端
- 暗色主题：自动适应系统主题设置

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI框架**: Tailwind CSS
- **数据库**: Vercel Postgres
- **API**: Next.js API Routes
- **部署**: Vercel Platform
- **表单处理**: React Hook Form + Zod
- **样式**: Tailwind CSS + CSS Modules

## 本地开发

1. 克隆仓库
```bash
git clone <repository-url>
cd tree-hole
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
# 编辑 .env.local 填入必要的环境变量
```

4. 初始化数据库
```bash
# 在Vercel控制台创建Postgres数据库
# 运行schema.sql中的数据库迁移脚本
```

5. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 部署到Vercel

1. Fork这个仓库到你的GitHub账号

2. 在Vercel上创建新项目
   - 连接你的GitHub仓库
   - 选择Next.js框架预设

3. 配置环境变量
   - 在Vercel控制台创建Postgres数据库
   - 复制数据库连接信息
   - 在项目设置中配置环境变量

4. 初始化数据库
   - 在Vercel控制台的数据库页面
   - 运行schema.sql中的SQL语句

5. 部署
   - Vercel会自动部署你的应用
   - 每次推送到main分支都会触发自动部署

## 项目结构

```
src/
  ├── app/                 # Next.js 14 App Router
  │   ├── api/            # API路由
  │   ├── write/          # 写留言页面
  │   └── search/         # 查询页面
  ├── components/         # React组件
  │   ├── ui/            # 基础UI组件
  │   └── forms/         # 表单组件
  ├── lib/               # 工具函数和数据库操作
  └── types/             # TypeScript类型定义
```

## 开发指南

1. 组件开发
   - 所有UI组件都在`components/ui`目录下
   - 使用Tailwind CSS进行样式设计
   - 支持暗色主题

2. API开发
   - API路由在`app/api`目录下
   - 使用Vercel Postgres进行数据操作
   - 包含基本的错误处理

3. 数据库操作
   - 使用`@vercel/postgres`包
   - 所有SQL操作都在`lib/db.ts`中
   - 包含基本的类型安全

4. 表单处理
   - 使用React Hook Form进行表单管理
   - 使用Zod进行数据验证
   - 验证规则在`lib/validations.ts`中

## 贡献

欢迎提交Issue和Pull Request！

1. Fork这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个Pull Request

## 许可证

MIT

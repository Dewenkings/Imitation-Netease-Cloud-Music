# 🎵 网易云音乐 - 部署指南

## 快速开始

### 本地开发
```bash
# 安装依赖
npm install

# 启动前端开发服务器
npm run serve

# 启动后端API服务器（新终端）
npm run server:dev
```

### 本地部署测试
```bash
# 部署到测试环境（本地）
npm run deploy:dev

# 部署到生产环境（本地）
npm run deploy:prod
```

### PM2 管理命令
```bash
# 启动应用
npm run pm2:start

# 查看状态
npm run pm2:status

# 查看日志
npm run pm2:logs

# 重启应用
npm run pm2:restart

# 停止应用
npm run pm2:stop
```

## 自动部署

### 测试环境
推送到 `develop` 分支自动部署到测试环境：
```bash
git checkout develop
git add .
git commit -m "feat: 新功能"
git push origin develop
```

### 生产环境
推送到 `main` 分支自动部署到生产环境：
```bash
git checkout main
git merge develop
git push origin main
```

## 项目结构

```
├── .github/workflow/          # GitHub Actions 工作流
│   ├── deploy.yaml           # 通用部署模板
│   ├── deploy.dev.yaml       # 测试环境部署
│   └── deploy.prod.yaml      # 生产环境部署
├── scripts/
│   └── deploy.sh             # 本地部署脚本
├── server/                   # 后端服务器
│   ├── dist/                 # 前端打包文件（自动生成）
│   ├── logs/                 # 应用日志（自动生成）
│   ├── app.js                # 服务器入口文件
│   └── package.json          # 服务器依赖
├── src/                      # 前端源码
├── pm2.config.js             # PM2 配置文件
├── vue.config.js             # Vue 构建配置
└── DEPLOYMENT.md             # 详细部署文档
```

## 环境配置

### 测试环境
- 端口：3001
- 实例数：1
- 自动重启：是

### 生产环境
- 端口：3000
- 实例数：2（负载均衡）
- 自动重启：是
- 内存限制：1GB

## 部署原理

1. **前端构建**：`npm run build` 将Vue项目打包到 `server/dist`
2. **静态文件服务**：Express服务器提供静态文件服务
3. **API路由**：`/api/*` 路径由后端处理
4. **SPA支持**：使用 `connect-history-api-fallback` 支持Vue Router
5. **进程管理**：PM2管理Node.js进程，支持集群模式

## 常用命令

```bash
# 查看应用状态
pm2 status

# 查看实时日志
pm2 logs --lines 100

# 重启所有应用
pm2 restart all

# 停止所有应用
pm2 stop all

# 查看进程监控
pm2 monit
```

## 故障排除

### 应用无法启动
1. 检查端口是否被占用：`lsof -i :3000`
2. 查看PM2日志：`pm2 logs`
3. 检查Node.js版本：`node --version`

### 前端页面无法访问
1. 确认前端已构建：检查 `server/dist` 目录
2. 检查静态文件服务配置
3. 查看浏览器控制台错误

### API请求失败
1. 检查API路由配置
2. 查看服务器日志
3. 确认网易云音乐API服务状态

## 更多信息

详细的部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
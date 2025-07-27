# 部署说明文档

## 项目架构说明

### 前端和后端的关系

#### 1. 开发环境 vs 生产环境

**开发环境：**
- 前端：`npm run serve` - 启动Vue开发服务器（通常在3000端口）
- 后端：`node ./server/app.js` - 启动API服务器（通常在3001端口）
- 两者分离运行，前端通过代理访问后端API

**生产环境：**
- 前端：通过`npm run build`打包成静态文件到`server/dist`目录
- 后端：`node ./server/app.js` - 同时提供API服务和静态文件服务
- 单一服务器同时处理前端页面和API请求

#### 2. 生产环境的工作原理

当你运行`npm run build`时：
1. Vue项目被打包成静态文件（HTML、CSS、JS）
2. 这些文件被输出到`server/dist`目录（由vue.config.js配置）
3. `server/app.js`配置了Express静态文件服务，会自动服务这些文件

当用户访问你的网站时：
1. 访问根路径`/` → 返回`server/dist/index.html`
2. 访问API路径`/api/*` → 由后端API处理
3. 访问其他路径（如`/discover`）→ 由于是SPA，通过history API fallback返回`index.html`，然后由Vue Router处理

#### 3. 关键配置文件

**vue.config.js：**
```javascript
// 指定打包输出目录为 server/dist
outputDir: path.resolve(__dirname, 'server/dist')
```

**server/app.js（已更新）：**
```javascript
// 配置静态文件服务
const staticFileMiddleware = express.static(path.join(__dirname, 'dist'))
app.use(staticFileMiddleware)

// 配置 History API fallback（支持Vue Router的history模式）
app.use(history({
  disableDotRule: true,
  verbose: true
}))
app.use(staticFileMiddleware)
```

## 部署环境配置

### 测试环境
- **触发条件：** 推送到`develop`分支
- **服务器：** your-dev-server.com
- **端口：** 3001
- **实例数：** 1
- **应用名：** netease-music-dev

### 生产环境
- **触发条件：** 推送到`main/master`分支或发布Release
- **服务器：** your-prod-server.com
- **端口：** 3000
- **实例数：** 2（负载均衡）
- **应用名：** netease-music-prod

## 部署流程

### 自动部署（推荐）

1. **提交代码到对应分支**
   ```bash
   git add .
   git commit -m "feat: 新功能"
   git push origin develop  # 部署到测试环境
   # 或
   git push origin main     # 部署到生产环境
   ```

2. **GitHub Actions自动执行：**
   - 安装依赖
   - 构建前端项目
   - 打包部署文件
   - 上传到服务器
   - 使用PM2启动/重启应用

### 手动部署

1. **构建项目**
   ```bash
   # 安装前端依赖
   npm install
   
   # 构建前端
   npm run build
   
   # 安装服务器依赖
   cd server
   npm install
   ```

2. **上传到服务器**
   ```bash
   # 上传server目录和pm2.config.js到服务器
   scp -r server/ pm2.config.js user@your-server:/var/www/your-app/
   ```

3. **启动应用**
   ```bash
   # 在服务器上
   cd /var/www/your-app
   
   # 设置环境变量
   export NODE_ENV=production
   export PORT=3000
   export NAME=netease-music-prod
   
   # 启动应用
   pm2 start pm2.config.js
   ```

## 服务器要求

### 系统要求
- Ubuntu 18.04+ 或 CentOS 7+
- Node.js 16+
- PM2
- Nginx（可选，用于反向代理）

### 安装依赖
```bash
# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2
npm install -g pm2

# 安装Nginx（可选）
sudo apt-get install nginx
```

### Nginx配置（推荐）

生产环境建议使用Nginx作为反向代理和静态文件服务器。项目根目录下的 `nginx.conf.example` 提供了完整的配置示例。

#### 核心配置说明

1. **静态文件服务**（前端页面）：
```nginx
location / {
    root /var/www/netease-music-prod/current/dist;
    index index.html;
    try_files $uri $uri/ /index.html;
}
```

2. **API代理**（后端接口）：
```nginx
location /api/ {
    proxy_pass http://localhost:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

#### 配置步骤

1. 复制配置文件：
```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/netease-music
```

2. 修改配置中的域名和路径：
```bash
sudo nano /etc/nginx/sites-available/netease-music
```

3. 启用站点：
```bash
sudo ln -s /etc/nginx/sites-available/netease-music /etc/nginx/sites-enabled/
```

4. 测试配置并重启：
```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### 工作原理

- **域名根目录访问**：直接访问 `your-domain.com` 时，Nginx会从 `/var/www/netease-music-prod/current/dist/` 目录提供静态文件
- **前端路由支持**：`try_files $uri $uri/ /index.html` 确保Vue Router的前端路由正常工作
- **API请求代理**：所有 `/api/` 开头的请求会被代理到本地3000端口的Node.js服务器
- **缓存优化**：静态资源（JS、CSS、图片）设置长期缓存，HTML文件不缓存以确保更新及时生效

## 常见问题

### Q: 为什么要把前端打包到server/dist？
A: 这样可以让一个Node.js服务器同时处理前端页面和API请求，简化部署架构，减少服务器资源消耗。

### Q: 部署后直接访问index.html会工作吗？
A: 是的！当用户访问任何路径时，Express会：
1. 先尝试找对应的静态文件
2. 如果找不到，通过history API fallback返回index.html
3. 然后Vue Router接管路由，显示对应页面

### Q: 如何处理API请求？
A: 所有以`/api`开头的请求会被后端API处理，其他请求会返回前端页面。

### Q: 如何查看应用状态？
A: 使用PM2命令：
```bash
pm2 status          # 查看所有应用状态
pm2 logs app-name   # 查看应用日志
pm2 restart app-name # 重启应用
```

## 安全注意事项

1. **环境变量：** 敏感信息（如数据库密码）应通过环境变量传递
2. **SSH密钥：** 在GitHub Secrets中安全存储SSH部署密钥
3. **防火墙：** 只开放必要的端口（80, 443, 22）
4. **HTTPS：** 生产环境建议配置SSL证书

## 监控和维护

1. **日志管理：** PM2会自动管理应用日志
2. **自动重启：** 应用崩溃时PM2会自动重启
3. **资源监控：** 可以使用PM2 Plus进行高级监控
4. **备份策略：** 部署时会自动备份上一个版本
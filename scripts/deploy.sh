#!/bin/bash

# 网易云音乐项目部署脚本

set -e

echo "🎵 开始部署网易云音乐项目..."

# 检查参数
if [ "$#" -ne 1 ]; then
    echo "使用方法: $0 [dev|prod]"
    echo "  dev  - 部署到测试环境"
    echo "  prod - 部署到生产环境"
    exit 1
fi

ENV=$1

# 设置环境变量
if [ "$ENV" = "dev" ]; then
    export NODE_ENV=development
    export PORT=3001
    export NAME=netease-music-dev
    export INSTANCES=1
    echo "📍 部署环境: 测试环境"
elif [ "$ENV" = "prod" ]; then
    export NODE_ENV=production
    export PORT=3000
    export NAME=netease-music-prod
    export INSTANCES=2
    echo "📍 部署环境: 生产环境"
else
    echo "❌ 错误: 无效的环境参数 '$ENV'"
    exit 1
fi

echo "🔧 环境配置:"
echo "  NODE_ENV: $NODE_ENV"
echo "  PORT: $PORT"
echo "  NAME: $NAME"
echo "  INSTANCES: $INSTANCES"
echo ""

# 检查Node.js和npm
echo "🔍 检查依赖..."
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到Node.js，请先安装Node.js"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到npm，请先安装npm"
    exit 1
fi

echo "✅ Node.js版本: $(node --version)"
echo "✅ npm版本: $(npm --version)"
echo ""

# 安装前端依赖
echo "📦 安装前端依赖..."
npm ci

# 构建前端
echo "🏗️  构建前端项目..."
npm run build

# 安装服务器依赖
echo "📦 安装服务器依赖..."
cd server
npm ci
cd ..

# 创建日志目录
echo "📁 创建日志目录..."
mkdir -p server/logs

# 检查PM2
if command -v pm2 &> /dev/null; then
    echo "✅ PM2版本: $(pm2 --version)"
    
    # 停止现有应用
    echo "🛑 停止现有应用..."
    pm2 stop $NAME 2>/dev/null || echo "  没有找到运行中的应用 $NAME"
    pm2 delete $NAME 2>/dev/null || echo "  没有找到应用 $NAME"
    
    # 启动应用
    echo "🚀 启动应用..."
    pm2 start pm2.config.js
    
    # 保存PM2配置
    pm2 save
    
    # 显示应用状态
    echo ""
    echo "📊 应用状态:"
    pm2 status $NAME
    
    echo ""
    echo "🎉 部署完成！"
    echo "📍 应用地址: http://localhost:$PORT"
    echo "📝 查看日志: pm2 logs $NAME"
    echo "🔄 重启应用: pm2 restart $NAME"
    echo "🛑 停止应用: pm2 stop $NAME"
else
    echo "⚠️  警告: 未找到PM2，将使用node直接启动"
    echo "💡 建议安装PM2: npm install -g pm2"
    echo ""
    echo "🚀 启动应用..."
    cd server
    echo "📍 应用地址: http://localhost:$PORT"
    echo "🛑 按 Ctrl+C 停止应用"
    node app.js
fi
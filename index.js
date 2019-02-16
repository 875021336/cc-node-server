var http = require('http') // http模块创建服务器
var path = require('path') // path模块根据系统内部自动识别url类型
var fs = require('fs') // fs模块用于读写文件
var url = require('url') // url模块自动解析用户的url得到一些有用信息

//staticRoot静态路径
function staticRoot(staticPath,req,res){
    //解析url路径，包括文件名
	var pathObj = url.parse(req.url,true)  

	//设置默认读text.html
	if(pathObj.pathname === '/'){
		pathObj.pathname += 'text.html'
	}

	//获取资源文件的具体路径
	var filePath = path.join(staticPath,pathObj.pathname)

     //同步读取文件
	// var fileContent = fs.readFileSync(filePath,'binary')
	// res.write(fileContent,'binary')
	// res.end()

    //判断是否读到
	fs.readFile(filePath,'binary',function(err,fileContent){
		if(err){  //文件名不存在
			console.log('404')
			res.writeHead(404,'not Found')
			res.end('<h1>Not Found!</h1>')
		}else{  //文件名存在
			console.log('okay')
			res.writeHead(200,'okay')
			res.write(fileContent,'binary')
			res.end()
		}
	})
}

//自动生成文件的绝对路径，根据绝对路径读取文件
//创建服务器
console.log(path.join(__dirname,'sample'))   //__dirname代表当前文件所在的文件目录

var server = http.createServer(function(req,res){
	staticRoot(path.join(__dirname,'sample'),req,res)
})
server.listen(8080)
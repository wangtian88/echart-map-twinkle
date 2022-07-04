/**
 * Created by wangqingjie on 2021/6/16
 * 这个文件是用来把 response.json 做简化 另存为 response2.json
 * 只保留经纬度和rank,文件减小80%多
 */
let demo=JSON.parse(require('fs').readFileSync('response.json').toString());

console.log(demo.obj[0]);
let list=[];
demo.obj.forEach((one)=>{
    let n=one.properties.rank;
    let tmp=[one.geometry.coordinates[0],one.geometry.coordinates[1],n];
    list.push(tmp);
});

require('fs').writeFileSync('response2.json',JSON.stringify(list));

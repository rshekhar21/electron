// if (module.hot) {
//     module.hot.accept();    
//  }
//  document.getElementById('root').innerHTML = 'Hello, Hot Reloading!'; 

document.addEventListener('DOMContentLoaded', ()=>{
    test();
    console.log('abdd')
})

async function test() {
   let res = await ebs.test('ok');  console.log(res);
}
(async function(){
  for(let i of $clipboard.text){
    await $wait(0.1);
    $keyboard.insert(i);
  }
})()

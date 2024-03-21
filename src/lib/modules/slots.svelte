<script>
  import {sleep} from "$lib/index";
  export let vinner = undefined;
  export let callback = () => {console.log('Du vant ' + vinner)}
  let number = ['---'];
  let info = 'Trykk pull for å starte';
  let spill = true;
  async function click() {
      for (let i = 0; i < 20; i++) {
        number[0] = Math.round(Math.random() * 100);
        number[1] = Math.round(Math.random() * 100);
        number[2] = Math.round(Math.random() * 100);
        await sleep(100);
      }

      spill = false;
      let a = number[0] = Math.round(Math.random()*8+1);
      let b = number[1] = Math.round(Math.random()*8+1);
      let c = number[2] = Math.round(Math.random()*8+1);
      let d = String(a) + String(b) + String(c)
      vinner = Number(d)
      if (number[0] == number[1] && number[0] == number[2]) {
        info = 'Du vinner!';
      } else {
        info = 'Du taper!';
        vinner *= -1;
      }

      
      callback()
      console.log(d)
  }

</script>
<!--
  @component
  `vinner = undefined`
  `callback`
-->
<body>
<br>
<hr id=hr>
<h1>Slotmachine</h1>
<hr id=hr>
<div class=container>
  <div class=content>
  {info}
  </div>
  <div id=reels>
  {#each number as n}
    {n}
  {/each}
  </div>
  <br>
  <hr>
  <br>
  <div class=button>
    {#if spill}
      <button on:click={click}>Pull</button>
    {/if}
  
  </div>
</div>
</body>
<style>
  body {
    margin-top: 5%;
  }
  #hr {
    width: 30%;
  }
  .container {
    padding: 10%;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
  button {
    font-size: 115%;
    color: darkslategrey;
    width: 30%;
    padding: 20px;
    background-color:whitesmoke;
    border: solid;
    border-width: 1px;
    border-color: gainsboro;
    transition: 0.2s;
    
  }
  button:hover {
    color: white;
    background-color: gainsboro;
    cursor: pointer;
  }
  .button {
    display: flex;
    justify-content: center;
    
  }
  #reels {
    display: flex;
    justify-content: center;
    font-size: 250%;
  }
  .content {
    display: flex;
    justify-content: center;
  }
</style>
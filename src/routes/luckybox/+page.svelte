<script>

 
    import forside from "$lib/bilder/forside.png";


    function poeng() {
    let a = Math.floor(Math.random() * 11)
    console.log(a) 
    return a
   
}

function mistpoeng() {
    let b = Math.floor(Math.random() * -1000) - 1
    console.log(b)
    return b
}

function VinnEllerTap() {
    let c = Math.random()

    if (c < 0.5) {
        return poeng()
    }

    else {
        return mistpoeng()
    }
}

</script>

<style>
    @import './style.css';
</style>

<table>

    <tr>
        <td></td>
    </tr>
    <tr>
        <div class="wrapper">
    

        <li class="card" on:click={VinnEllerTap}>
    
            <div class="img">
                <img src={forside} alt="">
            </div>
    
        </li>
    
    </div>
</tr>


</table>




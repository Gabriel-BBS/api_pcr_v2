(function readyJS(win,doc){
    if(doc.querySelectorAll('.deletar')){
        for(let i=0;i<doc.querySelectorAll('.deletar').length;i++){
            doc.querySelectorAll('.deletar')[i].addEventListener('click',function(event){
                if(confirm("Deseja mesmo apagar esse dado?")){
                    return true;

                }else{
                    event.preventDefault();
                }
            });
        }
    }
})(window,document);

function react(id){ 
    let idm = "s"+id; 
    document.getElementById(idm).addEventListener('click',(e)=>{
        e.preventDefault();
        console.log(id);
    })
}


  
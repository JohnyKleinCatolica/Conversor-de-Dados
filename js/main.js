     function escreveConversao(){
         var entrada = document.getElementById("tipoEntrada").value, saida = document.getElementById("tipoSaida").value;
         var input = document.getElementById("valorEntrada").value;
         
         if (entrada=="decimal"){
             if(saida=="binario"){
                 document.getElementById("resultado").value = decimalParaBinario(input);
             } else if(saida=="hexadecimal"){
                 document.getElementById("resultado").value = decimalParaHexadecimal(input);
             } else if(saida=="octal"){
                 document.getElementById("resultado").value = decimalParaOctal(input);
             } else {
                 document.getElementById("resultado").value = document.getElementById("valorEntrada").value;
             } 
         } else if (entrada=="binario"){
            if(saida=="decimal"){
                 document.getElementById("resultado").value = binarioParaDecimal(input);
             } else if(saida=="hexadecimal"){
                 document.getElementById("resultado").value = binarioParaHexadecimal(input);
             } else if(saida=="octal"){
                 document.getElementById("resultado").value = binarioParaOctal(input);
             } 
             else {
                 document.getElementById("resultado").value = document.getElementById("valorEntrada").value;
             }          
        } else if (entrada=="hexadecimal"){
           if(saida=="decimal"){
                document.getElementById("resultado").value = hexadecimalParaDecimal(input);
            } else if(saida=="binario"){
                document.getElementById("resultado").value = hexadecimalParaBinario(input);
            } else if(saida=="octal"){
                document.getElementById("resultado").value = hexadecimalParaOctal(input);
            } 
            else {
                document.getElementById("resultado").value = document.getElementById("valorEntrada").value;
            }          
        } else if (entrada=="octal"){
            if(saida=="decimal"){
                 document.getElementById("resultado").value = octalParaDecimal(input);
             } else if(saida=="hexadecimal"){
                 document.getElementById("resultado").value = octalParaHexa(input);
             } else if(saida=="binario"){
                 document.getElementById("resultado").value = octalParaBinario(input);
             } 
             else {
                 document.getElementById("resultado").value = document.getElementById("valorEntrada").value;
             }          
         }
     }

    function decimalParaBinario(numero){ 
        var binario = "";
        if (numero==0){
            binario = "0";
        } else {
            conversao(numero);
        }

        function conversao(entrada){
            var divisao = entrada/2, divisaoInt = Math.trunc(divisao), divisivel = divisao-divisaoInt; 

            if(entrada>0) {
                if(divisivel!=0){
                    binario += "1";
                } else {
                    binario += "0";
                }
                conversao(divisaoInt);
            }
        }

        return  binario.split('').reverse().join('');
    }
    function decimalParaHexadecimal(valor){
        return hexadecimal(valor); 

        function hexadecimal(numero){
            var divisao = Math.trunc(numero / 16), hexa = "", 
                resto = Math.trunc(numero) - (Math.trunc(divisao * 16));

           hexa = retornaLetra(Math.trunc(resto));

           if (divisao > 16) {
               hexa = decimalParaHexadecimal(Math.trunc(divisao)) + hexa;
               return hexa;
           } else {
               if (numero>=10){
                   return numero>15 ? Math.trunc(divisao) + "" + hexa : hexa;
               } else {
                   return numero;
               }
           }

        }
            function retornaLetra(numero) {
                if (numero>=10 && numero<=15){
                    switch (numero) {
                    case 10:
                        return 'A';
                    case 11:
                        return 'B';
                    case 12:
                        return 'C';
                    case 13:
                        return 'D';
                    case 14:
                        return 'E';
                    case 15:
                        return 'F';
                    default:
                        return "";
                    }
                } else {
                    return numero;
                }
            }
        
    }
    function decimalParaOctal(valor){
        var octal = "", divisao = 0, resto;
        conversaoOctal(valor);
        
        function conversaoOctal(entrada){
            divisao = entrada/8, //entradaFull = entrada;
            resto = entrada - (parseInt(divisao) * 8);
           
               if(entrada>0){
                   octal += resto;
                   entradaFull = entrada; //Pega último
                   conversaoOctal(parseInt(divisao));
                }
        }
        return octal.split('').reverse().join('');
    }

    function binarioParaDecimal(binario){
        var numeroDecimal = 0;
        
        for(var i=0; i<binario.length; i++){
            if (binario.charAt(i) == "1"){
                numeroDecimal += Math.pow(2, (binario.length-1)-i);
            }
        }
        return numeroDecimal;
    } 
    function binarioParaHexadecimal(valor){ //Reúso
        var conversao = binarioParaDecimal(valor);
        return decimalParaHexadecimal(conversao);
    }
    function binarioParaOctal(valor){ //Reúso
        var conversao = binarioParaDecimal(valor);
        return decimalParaOctal(conversao);
    }    

    function hexadecimalParaDecimal(valor){ 
        var vet = ["a", "b", "c", "d", "e", "f"], numeroDecimal = 0, vetDecimal = [valor.length-1], j = 0, k = 1,  pos = 0; hexaDec = 10,
        decConversao = 0;
        
        function seForChar(parteValor){ //caso caracter
            for(j=0; j<vet.length; j++){ 
                if(vet[j] == parteValor.toLowerCase()){
                    numeroDecimal += hexaDec;
                    j += 7;
                    return true;
                }
                hexaDec++;
            }            
        }
        
        for(var i=0; i<valor.length; i++){ //caso decimal
            if(seForChar(valor.charAt(i))){
                hexaDec = 10;
            } else {
                numeroDecimal += parseInt(valor.charAt(i));
                hexaDec = 10;
            }
            vetDecimal[i] = numeroDecimal;
            numeroDecimal = 0;
        }  

        for(var i=0; i<vetDecimal.length; i++){ //conversao
            decConversao +=  vetDecimal[i] * Math.pow(16, vetDecimal.length-k);
            k++;
        } 
        
        return decConversao;
    }
    function hexadecimalParaBinario(valor){ //Reúso
        var conversao = hexadecimalParaDecimal(valor);
        return decimalParaBinario(conversao);

    }
    function hexadecimalParaOctal(valor){ //Reúso
        var conversao = hexadecimalParaDecimal(valor);
        return decimalParaOctal(conversao);

    }

    function octalParaDecimal(octal){
        var numeroDecimal = 0;
        
        for(var i=0; i<octal.length; i++){
            numeroDecimal += octal.charAt(i) * Math.pow(8,(octal.length-1)-i);
        }
        return numeroDecimal;        
    } 
    function octalParaBinario(valor){ //Reúso
        var conversao = octalParaDecimal(valor);
        return decimalParaBinario(conversao);
    }
    function octalParaHexa(valor){ //Reúso
        var conversao = octalParaDecimal(valor);
        return decimalParaHexadecimal(conversao);
    }  
#include <stdio.h>
#include <locale.h>
	
float divisao, divisivel;
int i, binario[150], tamanhoVetor = 0, dividendo, divisaoInt;

void converteToBinario(float num){
	int continuar = 0;
	do {
		printf("Número a ser convertido para Binário: ");
		scanf("%f", &num);		
		printf("%0.0f em binário: ", num);
		
		if(num==0){
			binario[0] = 0;
			tamanhoVetor = 1;
		} else {		
			for(i=0; num>=1; i++){	
				dividendo = num;
				divisao = num/2;
				divisaoInt = divisao;
				divisivel = divisao - divisaoInt;
				
				if(divisivel!=0){ 
					binario[i] = 1;
				} else {
					binario[i] = 0;
				}
				
				tamanhoVetor++;		
				num = divisaoInt;			
			}
		}
		
		for (i=tamanhoVetor-1; i>=0; i--){
			printf("%d", binario[i]);
		}
		tamanhoVetor = 0;	
				
		printf("\n\nDigite 1 para continuar, 0 para sair:\n");
		scanf("%d", &continuar);
		printf("\n");
	} while (continuar==1);		
}

int main(void){
	setlocale(LC_ALL, "Portuguese");
	float num = 0;

	converteToBinario(num);
	
	getch();
	return 0;
}

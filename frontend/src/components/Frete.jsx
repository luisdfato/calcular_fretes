import {useDtate, useState} from 'react'

const Frete = () => {

    // hooks useState manipula op estado variavel
    const [distancia,setDistancia]=useState('');
    const [tipoTransporte, setTipoTranporte] = useState('bicicleta');
    const [valorFrete, setValorFrete] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const hundleFrete =async()=>{
        error.preventDefault();
        setLoading(false);
        setValorFrete(null);
        setError(null);
        try {
            const resp =await fetch("http://localhost:3001/calcularfrete",{
                method: 'POST',
                headers:{
                    'content-Type': 'aplication/json',
                },
                body:JSON.stringify({distancia:parseFloat(distancia) , tipoTransporte}),
            });
            if(!resp.ok){
                const errorDados =await resp.json(); 
                throw new Error(errorDados.error || 'Erro ao calcular o frete')
            }
            const data = await resp.json(); 
            setValorFrete(data.valorTotal); 
        }
        catch(erro){
            setError(erro)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <>
      
    </>
  )
}

export default Frete

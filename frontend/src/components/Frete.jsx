import { useState } from "react"

const Frete = () => {

    //Hooks-useState-Manipula o estado da variavel
    const [distancia, setDistancia] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('bicicleta');
    const [valorFrete, setValorFrete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFrete = async (e) => {
        //previne que o formulario não faça reload
        e.preventDefault();
        setLoading(true);
        setValorFrete(null);
        setError(null);
        //TRATAMENTO DE ERROS COM TRY,CATCH, FINALLY
        try {
            const resp = await fetch("http://localhost:3001/calcularfrete", {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ distancia: parseFloat(distancia), tipoTransporte }),  
            });  
            //validação  
            if (!resp.ok) {  
                const erroDados = await resp.json();  
                //Tratamento de erros na aplicação  
                throw new Error(erroDados.error || 'Erro ao calcular o frete');  
            }  
            const data = await resp.json();  
            setValorFrete(data.valorTotal);  
  
        }  
        catch (erro) {  
            setError(erro)  
        }  
        finally {  
            setLoading(false)  
        }  
  
  
    }  
  
  
    return (  
        <div className="flex justify-center items-center min-h-screen bg-slate-950 p-4">  
            
            <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full border border-slate-700">  
                
                <h1 className="text-3xl font-bold text-white mb-6">
                    Calculadora de Frete
                </h1>  
                
                <form onSubmit={handleFrete} className="space-y-6">   
                    
                    <div className="space-y-2 text-left">  
                        <label className="block text-slate-300 font-medium">
                            Distância(km)
                        </label>  
                        
                        <input  
                            type="number"  
                            id="distancia"  
                            value={distancia}  
                            min="0"  
                            step="0.01"  
                            required  
                            onChange={(e) => setDistancia(e.target.value)}  
                            className="w-full px-4 py-3 bg-slate-800 text-white border border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"  
                        />  
                    </div>  
                    
                    <div>  
                        <label className="text-slate-300">
                            Transporte
                        </label>  
                        
                        <select  
                            id="transport"  
                            value={tipoTransporte}  
                            onChange={(e) => setTipoTransporte(e.target.value)}  
                            className="w-full mt-2 px-4 py-3 bg-slate-800 text-white border border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >  
                            <option value="bicicleta">Bicicleta</option>  
                            <option value="carro">Carro</option>  
                            <option value="drone">Drone</option>                     
                        </select>  
                    </div>  
  
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                    >  
                        {loading ? "Calculando" : "Calcular"}  
                    </button>  
                </form>  
  
                {error && (
                    <p className="mt-4 text-red-400">
                        {error}
                    </p>
                )}  
  
                {valorFrete !== null && (  
                    <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-2xl">  
                        <h2 className="text-xl font-bold text-emerald-400">
                            valor do Frete: R$ {valorFrete}
                        </h2>  
                    </div>  
                )}  
            </div>  
        </div>  
    )  
}  
  
export default Frete
const API_URL = "http://192.168.101.183:8080/PedidosREST/api";


    (function () {
        $.ajax({
            url: API_URL + "/pedidos"
        })
            .done(function (pedidos) {
                console.log("Pedidos", pedidos)

                let htmlPedidos = '';

                pedidos.forEach(unPedido => {
                    htmlPedidos += `<li id="ped-${unPedido.pid}"class="list-group-item">
            <a href="#" class="detail" data-pid="${unPedido.pid}">
            ${unPedido.pid} | ${unPedido.descripcion} | ${unPedido.monto}
            </a>
            <span><button class="btn btn-secondary borrar" data-pid="${unPedido.pid}">XXX</button></span>
            </li>`;
                });

                htmlPedidos += "<ul>";

                $("#lista-pedidos").html(htmlPedidos);
                asociarBorrarPedidos();
                asociarDetallePedidos();


            })
            .fail(function (error) {
                console.log("Error", error)



            });
    })();

function asociarBorrarPedidos() {
    $(".borrar").click(function (e) {
        console.log("borrar");
        let pid = this.getAttribute("data-pid");
        $.ajax({
            url: API_URL + "/pedidos/" + pid,
            method: "DELETE"
        })
            .done(function (data) {
                console.log("Datos Recibidos: ", data);

                if (data) {
                    let hijo = document.getElementById('ped-' + pid);
                    hijo.parentElement.removeChild(hijo);
                } else {
                    alert("Si recargas la pagina funciona")
                }

            })
            .fail(function (error) {
                console.log("Error: ", error);
            });
    })
}

function asociarDetallePedidos() {
    $(".detail").click(function (e) {
        e.preventDefault();

        console.log("detail", this);
        let pid = this.getAttribute("data-pid");
        $.ajax({
            url: API_URL + "/pedidos/" + pid,
            headers:{token:"xxx", Accept: "application/json"}
        })
            .done(function (pedido) {
                console.log("Datos Recibidos: ", pedido);
            })
            .fail(function (error) {
                console.log("Error: ", error);
                if(error.status==403){
                    console.log("Reenviar el login")
                }
            });
    })
}

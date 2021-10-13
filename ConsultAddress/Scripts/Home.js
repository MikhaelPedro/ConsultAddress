$(document).ready(function () {
    $("#PostalCode").mask("99999-999");
});


$("#btnConsult").click(function() {
/*$(document).ready(function () {*/

    //var html = '<form method="get" action=".">< label >CEP:<input name="cep" type="text" id="cep" value="" size="10" maxlength="9" /></label ><br /><label>Street:<input name="rua" type="text" id="rua" size="60" /></label><br /><label>District:<input name="bairro" type="text" id="bairro" size="40" /></label><br /><label>City:<input name="cidade" type="text" id="cidade" size="40" /></label><br /><label>State:<input name="uf" type="text" id="uf" size="2" /></label><br /><label>IBGE:<input name="ibge" type="text" id="ibge" size="8" /></label><br /></form >';
    //$(".Card").append(html);
    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }

    //Quando o campo cep perde o foco.
   /* $("#PostalCode").blur(function () {*/

        //Nova variável "cep" somente com dígitos.
    var cep = $("#PostalCode").val().replace(/\D/g, ''); 
        //var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.7
                $("#cep").val("...")
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#cep").val(dados.cep);
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
});

$("#btnClean").click(function () {
    $(".card").html("");
});


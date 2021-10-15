$(document).ready(function () {
    $("#PostalCode").mask("99999-999");
    $(".cards").html("");
});
var consultas = [];

$("#btnConsult").click(function() {
    /* = (".input_cep").text();*/
    
    //var html = '<form method="get" action=".">< label >CEP:<input name="cep" type="text" id="cep" value="" size="10" maxlength="9" /></label ><br /><label>Street:<input name="rua" type="text" id="rua" size="60" /></label><br /><label>District:<input name="bairro" type="text" id="bairro" size="40" /></label><br /><label>City:<input name="cidade" type="text" id="cidade" size="40" /></label><br /><label>State:<input name="uf" type="text" id="uf" size="2" /></label><br /><label>IBGE:<input name="ibge" type="text" id="ibge" size="8" /></label><br /></form >'    
    var var_cep = $("#PostalCode").val();
    //var xpto = [2, 1];
    //if (xpto.filter(p => p == 1).length >= 1)
    //    alert('aaa');

    if (consultas.filter(p => p == var_cep).length == 0) {

        consultas.push($("#PostalCode").val());

        function limpa_formulário_cep() {
            // Limpa valores do formulário de cep.
            $(this).find("#rua").val("");
            $(this).find("#bairro").val("");
            $(this).find("#cidade").val("");
            $(this).find("#uf").val("");
            $(this).find("#ibge").val("");
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

                        var html = '<div class="card col-md-4"><label>CEP:<input type="text" id="" class="form-group-sm form-control input_cep" value="' + dados.cep + '" size="10" maxlength="9"/></label><br/><label>Street:<input type="text" id="" class="form-group-sm form-control input_rua" value="' + dados.logradouro + '" size="60"/></label><br/><label>District:<input type="text" id="" class="form-group-sm form-control input_bairro" value="' + dados.bairro + '"  size="40"/></label><br/><label>City:<input type="text" id="" class="form-group-sm form-control input_cidade" value="' + dados.localidade + '" size="40" /></label><br/><label>State:<input type="text" id="" class="form-group-sm form-control input_uf" value="' + dados.uf + '" size="2"/></label><br/><label>IBGE:<input type="text" id="" class="form-group-sm form-control input_ibge" value="' + dados.ibge + '" size="8"/></label><br/></div>';
                        $(".cards").append(html);

                        //Atualiza os campos com os valores da consulta.
                        //$(".input_cep").val(dados.cep);
                        //$(".input_rua").val(dados.logradouro);
                        //$(".input_bairro").val(dados.bairro);
                        //$(".input_cidade").val(dados.localidade);
                        //$(".input_uf").val(dados.uf);
                        //$("input_ibge").val(dados.ibge);
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
    }
    else {
        alert("Não é possível consultar o mesmo CEP, que já se encontra nos cards");
    }
    
});

$("#btnClean").click(function () {
    $(".cards").html("");
    consultas = [];
});
$("#btnDark").click(function () {
    $('body').css('background', '#2F4F4F');
    $('h1').css('color', '#FFFFFF');
    /*document.body.style.background = white;*/
});
$("#btnDefault").click(function () {
    $('body').css('background', '#F8F8FF');
    $('h1').css('color', '#000000');
    /*document.body.style.background = white;*/
});


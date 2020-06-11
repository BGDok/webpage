function translateNum2Txt(fromSelector, toSelector) {
	$(toSelector).val(num2bgtext($(fromSelector).val()));
	//var ${input.company_capital_banked_percentage} = (${input.company_capital}/${input.company_capital_banked})*100
}

function num2bgtext(number,stotinki=false) {
    //alert(number);
    var num0 = new Map([[0 ,"нула"],[1,"един"],[2,"две"],[3,"три"],[4,"четири"],[5,"пет"],[6,"шест"],[7,"седем"],[8,"осем"],[9,"девет"],[10,"десет"],[11,"единадесет"],[12,"дванадесет"]]);
    var num100 = new Map([[1,"сто"],[2,"двеста"],[3,"триста"]]);
    var  number = Number(number),
         div10 = (number - number % 10) / 10,
         mod10 = number % 10,
         div100 = (number - number % 100) / 100,
         mod100 = number % 100,
         div1000 = (number - number % 1000) / 1000,
         mod1000 = number % 1000,
         div1000000 = (number - number % 1000000) / 1000000,
         mod1000000 = number % 1000000,
         div1000000000 = (number - number % 1000000000) / 1000000000,
         mod1000000000 = number % 1000000000;
    if (number == 0) {
        return num0.get(number);
    }
    // До двайсет
    if (number > 0 && number < 20) {
        if (stotinki && number == 1)
            return "една";
        if (stotinki && number == 2)
            return "две";
        if (number == 2)
            return "два";
        return num0.has(number) ? num0.get(number) : num0.get(mod10) + "надесет";
    }
    if (number > 19 && number < 100) {
        var tmp = (div10 == 2) ? "двадесет" : num0.get(div10) + "десет";
        tmp = mod10 ? tmp + " и " + num2bgtext(mod10,stotinki) : tmp;
        return tmp;
    }
    // До хиляда
    if (number > 99 && number < 1000) {
        var tmp = num100.has(div100) ? num100.get(div100) : num0.get(div100) + "стотин";
        if ((mod100 % 10 == 0 || mod100 < 20) && mod100 != 0) {
            tmp += " и";
        }
        if (mod100) {
            tmp += " "+ num2bgtext(mod100);
        }
        return tmp;
    }
    // До милион
    if (number > 999 && number < 1000000) {
        /* Damn bulgarian @#%@#% два хиляди is wrong :) */
        var tmp = (div1000 == 1) ? "хиляда" :
               ((div1000 == 2) ? "две хиляди" : num2bgtext(div1000)+" хиляди");
        num0.set([2,"два"]);
        if ((mod1000 % 10 == 0 || mod1000 < 20) && mod1000 != 0) {
            if (!((mod100 % 10 == 0 || mod100 < 20) && mod100 != 0)) {
                tmp += " и";
            }
        }
        if ((mod1000 % 10 == 0 || mod1000 < 20) && mod1000 != 0 && mod1000 < 100) {
                tmp += " и";
        }
        if (mod1000) {
                tmp += " "+num2bgtext(mod1000);
        }
        return tmp;
    }
    // Над милион
    if (number > 999999 && number < 1000000000) {
        var tmp = (div1000000 == 1) ? "един милион" : num2bgtext(div1000000)+" милиона";
        if ((mod1000000 % 10 == 0 || mod1000000 < 20) && mod1000000 != 0) {
            if (!((mod1000 % 10 == 0 || mod1000 < 20) && mod1000 != 0)) {
                if (!((mod100 % 10 == 0 || mod100 < 20) && mod100 != 0)) {
                    tmp += " и";
                }
            }
        }
        and = ", ";
        if ((mod1000000 % 10 == 0 || mod1000000 < 20) && mod1000000 != 0 && mod1000000 < 1000) {
            if ((mod1000 % 10 == 0 || mod1000 < 20) && mod1000 != 0 && mod1000 < 100) {
                tmp += " и";
            }
        }
        if (mod1000000) {
            tmp += " "+num2bgtext(mod1000000);
        }
        return tmp;
    }
    // Над милиард
    /*
    if (number > 99999999 && number <= 2000000000) {
        alert("in милиард");
        var tmp = (div1000000000 == 1) ? "един милиард" : "";
        tmp = (div1000000000 == 2) ? "два милиарда" : tmp;
        if (mod1000000000) {
            tmp += " "+num2bgtext(mod1000000000);
        }
        return tmp;
    }
    */
    /* Bye ... */
    return "";
}
    function number2lv(number) {
        list(lv, st) = explode(".", number_format(number,2,".",""));
        lv = Number(lv);
        if (lv >= 2000000000)
            return "Твърде голямо число";
        text  = num2bgtext(lv);
        text += lv == 1 ? " лев":" лева";
        if (st != 0)
            text = preg_replace("/^един /","",text);
        if (st && st != 0) {
            sttext = num2bgtext(st,true);
            text += " и "+num2bgtext(st,true);
            text += st == 1 ? " стотинка":" стотинки";
        }
        return text;
    }
	
    function number2percent(number) {
        list(lv, st) = explode(".", number_format(number,2,".",""));
        lv = Number(lv);
        if (lv >= 2000000000)
            return "Твърде голямо число";
        text  = num2bgtext(lv);
        text += lv == 1 ? " процент":" процента";
        if (st != 0)
            text = preg_replace("/^едно /","",text);
        if (st && st != 0) {
            sttext = num2bgtext(st,true);
            text += " цяло и "+num2bgtext(st,true);
            text += st == 1 ? " процент":" процента";
        }
        return text;
    }

	function capitalCalculate(startCapital, bankedCapital, bankedCapitalPercent, sharesCount, sharesPrice, sharesBanked) {
		$(sharesPrice).val(Math.round($(startCapital).val()/$(sharesCount).val()));
		$(bankedCapitalPercent).val(Math.round(($(bankedCapital).val()/$(startCapital).val())*100));
		$(sharesBanked).val(Math.round($(bankedCapital).val()/$(sharesPrice).val()));
	}
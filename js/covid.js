function toggleCompany() {
    if($("#reason_for_leave").val() == "Полагане на труд."){
        $("#company_data_group").attr("hidden",false);
    } else {
        $("#company_data_group").attr("hidden",true);
    }
}

function toggleCurrentAddress() {
    if($("#has_current_address")[0].checked){
        clearGroupInputs("#current_address")
        
        $("#current_address").attr("hidden", false);
    } else {
        $("#current_address").attr("hidden",true);
    }
}

function toggleOtherAddress() {
    if($("#has_other_address")[0].checked){
        $("#other_address").attr("hidden", false);
    } else {
        $("#other_address").attr("hidden", true);
    }
}


function getCovidDoc(formSelector) {
    if($("#has_current_address")[0].checked == false){
        $("#current_user_address_city").val($("#user_address_city").val());
        $("#current_user_address_municipality").val($("#user_address_municipality").val());
        $("#current_user_address_pk").val($("#user_address_city_pk").val());
        $("#current_user_address_neighborhood").val($("#user_address_neighborhood").val());
        $("#current_user_address_street").val($("#user_address_street").val());
        $("#current_user_address_street_number").val($("#user_address_street_number").val());
        $("#current_user_address_block").val($("#user_address_block").val());
        $("#current_user_address_entry").val($("#user_address_entry").val());
        $("#current_user_address_floor").val($("#user_address_floor").val());
        $("#current_user_address_apartment").val($("#user_address_apartment").val());
    }

    var input = objectifyForm(formSelector);
    var docDefinition = {
        content: [
        {
            text: `ДЕКЛАРАЦИЯ\r\n\r\n`,
            style: 'title'
        },
        `\u200B\t\t\t\tАз, долуподписаният/та ${input.first_name.toUpperCase()} ${input.middle_name.toUpperCase()} ${input.last_name.toUpperCase()}`,
        {text:`\u200B\t\t\t\t(собствено, бащино и фамилно име)`,style:'hint'},
         `ЕГН ${input.pin_egn}, л.к. № ${input.user_id_number},  издадена от МВР-${input.card_issuer_city} \r\n на ${input.card_issue_date} год., с\r\n`,
        `постоянен адрес гр./с. ${input.user_address_city}, област ${input.user_address_municipality},\r\n бул./ул. ${input.user_address_street}. №${input.user_address_street_number}, ж.к. ${input.user_address_neighborhood}, бл ${input.user_address_block}., вх ${input.user_address_entry}., ет ${input.user_address_floor}., ап. ${input.user_address_apartment} и \r\n\r\n`,
        `настоящ адрес гр./с. ${input.current_user_address_city}, област ${input.current_user_address_municipality},\r\n бул./ул. ${input.current_user_address_street}.№ ${input.current_user_address_street_number}, ж.к. ${input.current_user_address_neighborhood}, бл ${input.current_user_address_block}., вх ${input.current_user_address_entry}., ет ${input.current_user_address_floor}.,ап. ${input.current_user_address_apartment}\r\n \r\n`,
        {
            text: `ДЕКЛАРИРАМ:\r\n\r\n`,
            style: 'title'
        },     
            `\u200B\t\t\t\t1.\tЖивея на следния адрес гр./с. ${input.other_user_address_city} област ${input.other_user_address_municipality}, бул./ул. ${input.other_user_address_street}.№ ${input.other_user_address_street_number}, ж.к. ${input.other_user_address_neighborhood}, бл ${input.other_user_address_block}., вх ${input.other_user_address_entry}., ет ${input.other_user_address_floor}.,ап. ${input.other_user_address_apartment}\r\n`,
            {
                text:`\u200B\t\t\t\t(Изписва се адреса, на който деклараторът пребивава, в случаите когато живее на адрес, различен от постоянния или настоящия му адрес. В случаите, когато живее на постоянния или настоящия си адрес, посочва на кой от тях.)`
                ,style:'hint'
            },  
            `\u200B\t\t\t\t2.\tМестоработата ми се намира на адрес гр./с. ${input.company_address_city},\r\n област ${input.company_address_municipality}, бул./ул. ${input.company_address_street} № ${input.company_address_street_number}\r\n`,
            `\u200B\t\t\t\t3.\tРаботя в/за ${input.company_tag_name},`,
            {text:`\u200B\t\t\t\t\t\t(наименование на юридическото или физическото лице, за което деклараторът работи)`,style:'hint'},          
            `\u200B\t\t\t\t4.\t…………………………………………………………………………………………………………………………………….`,
            {text:`\u200B\t\t\t\t\t\t(тук деклараторът собственоръчно изписва, че не работи, в случай че не упражнява трудова дейност)`,style:'hint'},
            `\u200B\t\t\t\t5.\tДруги обстоятелства, налагащи неотложно придвижването ми извън населеното място, в което се намира адресът, на който живея или работя са: ${input.reason_for_leave_text}`,
            {text:`\u200B\t\t\t\t(посочва в какво точно се изразява неотложността за пътуването - здравословно състояние на пътуващия или негови близки, завръщане на настоящия или постоянен адрес или други причини)`,style:'hint'},
            `\u200B\t\t\t\t6.\tИзвестно ми е, че наказателната отговорност по чл. 355, ал. 2 от Наказателния кодекс за нарушаване на наредба, правила или мерки, издадени против разпространяването или появяването на заразна болест по хората, по време на епидемия, пандемия или извънредно положение, свързано със смъртни случаи, е лишаване от свобода до пет години и глоба от десет до петдесет хиляди лева. \r\n \r\n \r\n \r\n`,

        {
            columns: [
                {
                  // star-sized columns fill the remaining space
                  // if there's more than one star-column, available width is divided equally
                    width: '40%',
                    text: `Дата на деклариране:…………………………`,
                },
                {
                  // auto-sized columns have their widths based on their content
                    width: '*',
                    text:[
                            `ДЕКЛАРАТОР:\r\n`,
                        {text:[
                            `\u200B\t\t\t\t\t\t\t(……………………………………………………………………….)\r\n`,                            
                            `\u200B\t\t\t\t\t\t\t\t\tподпис на декларатора\r\n`,
                            `\u200B\t\t\t\t\t\t\tсобствено, бащино и фамилно имe`
                                ],
                            style:'hint'
                        } 
                    ]
                },
 
            ]
        }      
        ]
    };

    makePDF(docDefinition,"BGDok-covid19");

}

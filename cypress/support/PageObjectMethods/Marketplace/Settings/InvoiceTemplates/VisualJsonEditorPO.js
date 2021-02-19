/// <reference types="Cypress" />
/*
* @author :kusum khandelwal
*This class is used to create function related to the VJE .
* */
export class VisualJsonEditorPO{

    #headerorFooterSection= "div[class*='menu-item-label']:contains('DYNAMIC_LOCATOR_VALUE')";
    #bodySection="div[data-auto-item='mainMenu:body']:contains('Body')";
    #coloumn="div:conatins('CONTENT') + div i div:contains('Column')";
    #inputTitle="label[class*='FormField__FormLabel']:contains('Title') +div input[class*='Input__InputWrapper']";
    #divTitle="div[class*='sc-iAy']:contains('Title')";
    #tokenLoopkup="label[class*='sc-hrW']:contains('Token Lookup')";
    #headerContent="div[class*='sc-fMi']:contains('CONTENT')";
    #divHeaderSection="div[class*='sc-iAy']:contains('DYNAMIC_LOCATOR_VALUE')";
    #paragraph="i[name='paragraph']";
    #styleLocator="div[class*='sc-fMi']";
    #previousPagefromComponent="div[class*='sc-gZM']> div[class*='sc-hMq'] > div[class*='sc-gqj'] > div[class*='sc-cMl'] > i[class*='sc-jDw']";
    #goBacktoMainSectionPage="div[class*='sc-gZM'] >div[class*='sc-kgo']> div[class*='sc-gqj']> div[class*='sc-cMl']> i[name='angle_left']";
    #goBackFromBodyPage="div[class*='sc-gZM'] >div[class*='sc-jTz']>div[class*='sc-kgo']> div[class*='sc-gqj']> div[class*='sc-cMl']> i[name='angle_left']";
    #titleInputDiv="label:contains('Title') + div[class*='Input__InputContainer'] input[class*='Input__InputWrapper']";
    #existingTokenHeaderTitle="{{Invoice Number}}";
    #existingTokenPageNumber="{{Page Number}}";
    #existingTokenBodyCustomerSection="{{First Name}} {{Last Name}}";
    #existingTokenBodySellerSection="{{Seller}}";
    #existingTokenBodyMemo="{{Memo}}";
    #existingTokenValueCustomer="[Customer First Name] [Customer Last Name]";
    #existingTokenValueSeller="[Seller Details]";
    #existingTokenValueInvoice="INVOICE";
    #existingTokenValueMemo="[Memo]";
    #existingTokenBodyInvoice="{{Invoice Number}}";
    #selectedSection="div[class*='ib-selected']";
    #pageSectionatHtml="div[class*='ib-text'] span[class='totalPages']";
    #titleBody="div[class*='sc-iAy']:contains('Title')";
    #saveTemplate="button[data-auto-action='headerSection:saveTemplate']";
    #previewLink="button[class*='Button-ktwawd'] span:contains('Preview')"
    #textareaBox="textarea[class*='sc-bRB']";
    #tokenCategoryDiv="div[class*='sc-esj']";
    #tokenCategory="div[class*='sc-kIPQ']";
    #tokenDiv="div[class*='sc-gzO'] div:contains('DYNAMIC_LOCATOR_VALUE')";
    #tokenLink="i[class*='copy-token-icon']";
    #tokenLoopCloseLink="div[class*='sc-cMl'] label[class*='sc-jAa']:contains('TOKENS')";
    #clipBoardTextcss="div[class*='sc-kPV']"
    #viewPdf="button[data-auto-action='headerSection:PDFView']";
    #closeVJE="i[name='close']";
    #publishTemplate="button[data-auto-action='headerSection:publishTemplate']";
    #confirmPublish="button[data-auto-action='publishTemplate']";

    /**
     * Select section from invoice.
     * @param sectionNameAtMain
     *
     */

    _sectionOfInvoice(sectionNameAtMain){
        if(sectionNameAtMain=="Body"){
            cy.get(this.#bodySection).click({force:true});
        }
        else{
        cy.get(this.#headerorFooterSection.replace('DYNAMIC_LOCATOR_VALUE',sectionNameAtMain)).click({force:true});
        }
    }

    /**
     *Open TokenLookup from VJE.
      * @private
     */

    expandTokenLookup(){
        cy.wait(1000);
        cy.get(this.#tokenLoopkup).click({force:true});
    }

    /**
     * It will redirect  from component page to Specific section page ->i.e from Title to Body page
     * @private
     */

    goBackToPreviousPage(){
        cy.wait(1000);
        cy.get(this.#previousPagefromComponent).click();
    }

    /**
     * It will redirect page from {Body,Header,Footer} to Main VJE page
     * @param sectionName {Body,Header,Footer}
     */
    goBackToMainSection(sectionName){
        cy.wait(1000);
        if(sectionName=="Body"){
        cy.get(this.#goBackFromBodyPage).click();
        }
        else{
            cy.get(this.#goBacktoMainSectionPage).click();
        }
    }

    /**
     * This will close the TokenLookup
     * @private
     */
    collapseTokenLookup(){
        cy.get(this.#tokenLoopCloseLink).click();
    }

    /**
     * This will be allowing to publish , only when something added or updated.
     * After publishing saveTemplate, PublishTemplate button will be disable.
     */
    publishTemplate(){
        cy.get(this.#publishTemplate).click({force:true});
        cy.get(this.#confirmPublish).click({force:true});
        cy.get(this.#publishTemplate).should("be.disabled");
        cy.get(this.#saveTemplate).should("be.disabled");
    }

    /**
     * This function will select token, under a seller or user category
     * @param tokenName
     * @param tokenCategory{SELLER DETAILS,USER DETAILS}
     */
    selectTokenWithCategory(tokenCategory,tokenName){
        cy.get(this.#tokenCategory).contains(tokenCategory).parent(this.#tokenCategoryDiv).as('parent');
        cy.get('@parent').next().find(this.#tokenDiv.replace('DYNAMIC_LOCATOR_VALUE',tokenName)).trigger('{mouseover}',{force:true}).as('token').then(()=>{
            cy.get('@token').parent().find(this.#tokenLink).click({force:true}).then(()=>{
                cy.get('@token').parent().find(this.#clipBoardTextcss).should("contain.text","Copied to clipboard");
            });
        });
    this.collapseTokenLookup();
    }

    /**
     * This function will allow to type token at particular selected area, if have some text already then it will append.
     * @param detailType->{Seller, User}
     * @param customAttributeType-->i.e Company,User,
     * @param customAttributeName
     * @param selector->location where we need to add the custom text
     * @param customText -custom text so user can verify which custom attribute he recently type.
     * @appendCustomAttributeFlag if customer want to append customattribute with exiting custom tokens.
     */
    _typeCustomAttributeAtComponent(detailType, customAttributeType, customAttributeName,selector,customText,appendCustomAttributeFlag) {
        let customAttributeToken = "{{" + detailType + " " + customAttributeType + " " + customAttributeName + "}}"

        cy.get(selector).click({force: true}).as("component").then(($value) => {
            if (!appendCustomAttributeFlag) {
                if ($value.text().includes(" | ")) {
                    var arr = $value.text().split(" | ");
                    cy.get("@component").clear().type(arr[0]+" | "+customText+customAttributeToken, {parseSpecialCharSequences: false});

                } else {
                    cy.get("@component").type(" | "+customText+customAttributeToken, {parseSpecialCharSequences: false});
                }
            } else {
                cy.get(selector).click({force:true}).type(" | "+customText+customAttributeToken,{ parseSpecialCharSequences: false });

            }
        })
    }

    /**
     * This function will allow to type token at particular selected area that value in attribute section,.
     * @param detailType->{Seller, User}
     * @param customAttributeType-->i.e Company,User,
     * @param customAttributeName
     * @param selector->location where we need to add the custom text
     * @param customText -custom text so user can verify which custom attribute he recently type.
     * @appendCustomAttributeFlag if customer want to append customattribute with exiting custom tokens.
     */
    _typeCustomAttributeAtComponentWithAttrValue(detailType, customAttributeType, customAttributeName,selector,customText,appendCustomAttributeFlag) {
        let customAttributeToken="{{"+detailType+" "+customAttributeType+" "+customAttributeName+"}}"
        cy.get(selector).click().as("component").then(($value)=>{
            if(!appendCustomAttributeFlag){
                if($value.attr("value").includes(" | ")) {
                    var arr = $value.attr("value").split(" | ");
                    cy.get("@component").invoke("attr","value",arr[0]+" | "+customText+customAttributeToken);
                 }
                else {
                cy.get("@component").type(" | "+customText+customAttributeToken,{ parseSpecialCharSequences: false });
                }
            }
            else{
                cy.get(selector).click({force:true}).type(" | "+customText+customAttributeToken,{ parseSpecialCharSequences: false });
            }
            })

    }

    /**
     * This function will verify the customAttribute at HTML view of Invoice.
     * @param detailType->{Seller, User}
     * @param customAttributeType-->{Company,User}
     * @param customAttributeName
     */
    isCustomAttributeExistAtHtmlPage(detailType,customAttributeType,customAttributeName,customText) {
        let customAttributeTokenValue ='['+detailType+' '+customAttributeType+' '+customAttributeName+']';
            cy.get(this.#selectedSection).should('contain.text',customText+customAttributeTokenValue);
    }

    /**
     * This function will verify custom attribute at HTML view under Page number section at header and footer section.
     * @param detailType->{Seller, User}
     * @param customAttributeType-->{Company,User}
     * @param customAttributeName
     * @param index{0,1}-> 0 for Header, 1 for footer.
     */
    pageSelectedForPDFNumber(detailType,customAttributeType,customAttributeName,index,customText){
        let customAttributeTokenValue ='['+detailType+' '+customAttributeType+' '+customAttributeName+']';
        cy.get(this.#pageSectionatHtml).eq(index).parent('div').should("contain.text",customText+customAttributeTokenValue);
    }

    /**
     * This section will that correct section selected on basis of content
     * @param content content will text which written on HTML side.
     */

    elementAtHtmlPage(content){
        cy.get(this.#selectedSection).should("contain",content);
    }

    /**
     * This will remove focus from specific area.
     */
    clickOnStyleLocation(){
        cy.get(this.#styleLocator).contains("STYLE").click({force:true});
    }

    /**
     * This function will allow to click on View PDF link.
     * @private
     */
    _viewPdf(){
        cy.get(this.#viewPdf).click({force:true});
    }

    /**
     * This function will allow to close the VJE and redirect to details page
     * @private
     */
    closeVJE(){
        cy.get(this.#closeVJE).click();
    }

    /**
     * This function will add customAttribute At header section of Invoice using VJE
     * @param detailType->{Seller, User}
     * @param customAttributeType-->i.e Company,User,
     * @param customAttributeName
     * @param sectionInHeader-> i.e {title, pagenumber}
     * @param customText -custom text so user can verify which custom attribute he recently type.
     * @appendCustomAttributeFlag if customer want to append customattribute with exiting custom tokens.
     */

    addCustomAttributeTokenAtHeader(detailType,customAttributeType,customAttributeName,sectionInHeader,customText,appendCustomAttributeFlag){
    this._sectionOfInvoice("Header");
    if(sectionInHeader=="title"){
            cy.waits();
            cy.get(this.#headerContent).next().find(this.#divHeaderSection.replace("DYNAMIC_LOCATOR_VALUE",'Title')).scrollIntoView({force:true}).click({force:true}).then(()=>{
                cy.get(this.#inputTitle).click({force:true}).as('inputbox').then(($textinput) => {
                    if(( $textinput.attr("value").includes(this.#existingTokenHeaderTitle))){
                        this._typeCustomAttributeAtComponentWithAttrValue(detailType,customAttributeType,customAttributeName,this.#inputTitle,customText,appendCustomAttributeFlag);
                        this.clickOnStyleLocation();
                        this.isCustomAttributeExistAtHtmlPage(detailType,customAttributeType,customAttributeName,customText);

                    }
                });
            })
    }
    else if(sectionInHeader=="pagenumber"){
        cy.get(this.#headerContent).next().find(this.#divHeaderSection.replace("DYNAMIC_LOCATOR_VALUE",'Page Number')).scrollIntoView({force:true}).click({force:true}).then(()=>{
        cy.get(this.#inputTitle).click({force:true}).as('element').then(($paragraphinput)=>{
            if(( $paragraphinput.attr("value").includes(this.#existingTokenPageNumber))){
                this._typeCustomAttributeAtComponentWithAttrValue(detailType,customAttributeType,customAttributeName,this.#inputTitle,customText,appendCustomAttributeFlag);
                cy.waits();
                this.clickOnStyleLocation();
                this.pageSelectedForPDFNumber(detailType,customAttributeType,customAttributeName,0,customText);
            }
        });
        })
    }
    }

    /**
     * This fucntion will verify existing token at paragraph section from different area. like Customer Details paragarph from body section, Seller details paragraph. Eg. #existingTokenBodyCustomerSection
     * @param existingToken Eg.existingTokenBodyCustomerSection
     * @param detailType->{Seller, User}
     * @param customAttributeType-->{Company,User}
     * @param customAttributeName
     * @param customText -custom text so user can verify which custom attribute he recently type.
     * @appendCustomAttributeFlag if customer want to append customattribute with exiting custom tokens.
     */
    _textAreaVerificationForExistingToken(existingToken,detailType,customAttributeType,customAttributeName,customText,appendCustomAttributeFlag){
        cy.get(this.#textareaBox).click({force:true}).then(($textarea)=>{
            if($textarea.text().includes(existingToken)){
                this._typeCustomAttributeAtComponent(detailType,customAttributeType,customAttributeName,this.#textareaBox,customText,appendCustomAttributeFlag);
                cy.get(this.#previewLink).click({force:true});
                this.clickOnStyleLocation();
                this.isCustomAttributeExistAtHtmlPage(detailType,customAttributeType,customAttributeName,customText)
            }
        })
    }

    /**
     * This particular section allow to add Token at Body in different section.
     * @param detailType->{Seller, User}
     * @param customAttributeType-->{Company,User}
     * @param customAttributeName
     * @param sectionName -> Section name will be in {customertitle,sellertitle,customerparagraph,sellerparagraph,invoicesection,memoparagraph}
     * @param customText -custom text so user can verify which custom attribute he recently type.
     * @appendCustomAttributeFlag if customer want to append customattribute with exiting custom tokens.
     */

    addCustomAttributeTokenAtBody(detailType,customAttributeType,customAttributeName,sectionName,customText,appendCustomAttributeFlag){
        this._sectionOfInvoice("Body");
        if(sectionName=="customertitle"){
            cy.get(this.#titleBody).eq(0).scrollIntoView({force:true}).click({force:true}).as('element').then(()=>{
                    this._typeCustomAttributeAtComponentWithAttrValue(detailType,customAttributeType,customAttributeName,this.#titleInputDiv,customText,appendCustomAttributeFlag);
                    this.clickOnStyleLocation();
                    this.isCustomAttributeExistAtHtmlPage(detailType,customAttributeType,customAttributeName,customText)
                })

        }
        else if(sectionName=="sellertitle"){
            cy.get(this.#titleBody).eq(1).scrollIntoView().click({force:true}).as('element').then(()=>{

                        this._typeCustomAttributeAtComponentWithAttrValue(detailType,customAttributeType,customAttributeName,this.#titleInputDiv,customText,appendCustomAttributeFlag);
                        this.clickOnStyleLocation();
                        this.isCustomAttributeExistAtHtmlPage(detailType,customAttributeType,customAttributeName,customText)
                    })
            }

        else if(sectionName=="customerparagraph"){
            cy.get(this.#paragraph).eq(0).trigger("mouseover",{force:true}).as('Customer').then(($text)=>{
            this.elementAtHtmlPage(this.#existingTokenValueCustomer);
            cy.get('@Customer').click({force:true});
            })
            this._textAreaVerificationForExistingToken(this.#existingTokenBodyCustomerSection,detailType,customAttributeType,customAttributeName,customText,appendCustomAttributeFlag);
            }

        else if(sectionName=="sellerparagraph"){
            cy.get(this.#paragraph).eq(1).trigger("mouseover",{force:true}).as('seller').then(($text)=>{
                this.elementAtHtmlPage(this.#existingTokenValueSeller);
                cy.get('@seller').click({force:true});
            })
            this._textAreaVerificationForExistingToken(this.#existingTokenBodySellerSection,detailType,customAttributeType,customAttributeName,customText,appendCustomAttributeFlag);
        }

        else if(sectionName=="invoicesection"){
            cy.get(this.#paragraph).eq(2).trigger("mouseover",{force:true}).as('invoice').then(($text)=>{
                this.elementAtHtmlPage(this.#existingTokenValueInvoice);
                cy.get('@invoice').click({force:true});
            })
            this._textAreaVerificationForExistingToken(this.#existingTokenBodyInvoice,detailType,customAttributeType,customAttributeName,customText,appendCustomAttributeFlag);
        }

        else if(sectionName=="memoparagraph") {
            cy.get(this.#paragraph).eq(3).trigger("mouseover",{force:true}).as('memo').then(($text)=>{
                this.elementAtHtmlPage(this.#existingTokenValueMemo);
                cy.get('@memo').click({force:true});
            })
            this._textAreaVerificationForExistingToken(this.#existingTokenBodyMemo,detailType,customAttributeType,customAttributeName,customText,appendCustomAttributeFlag);
        }
    }

    /**
     * This function will allow to add Token at footer at pagenumber section.
     * @param detailType->{Seller, User}
     * @param customAttributeType-->{Company,User}
     * @param customAttributeName
     * @param sectionName{pagenumber}
     * @param customText -custom text so user can verify which custom attribute he recently type.
     * @appendCustomAttributeFlag if customer want to append customAttribute with exiting custom tokens.
     */
    addCustomAttributeTokenAtFooter(detailType,customAttributeType,customAttributeName,sectionName,customText,appendCustomAttributeFlag){
        this._sectionOfInvoice("Footer");
        if(sectionName=="pagenumber"){
             cy.get(this.#headerContent).next().find(this.#divHeaderSection.replace("DYNAMIC_LOCATOR_VALUE","Page Number")).scrollIntoView({force:true}).click({force:true}).then(()=>{
                 cy.get(this.#inputTitle).click({force:true}).as('element').then(($paragraphinput)=>{
                     if(( $paragraphinput.attr("value").includes(this.#existingTokenPageNumber))){
                         this._typeCustomAttributeAtComponent(detailType,customAttributeType,customAttributeName,this.#inputTitle,customText,appendCustomAttributeFlag);
                         cy.wait(1000);
                         this.clickOnStyleLocation();
                         this.pageSelectedForPDFNumber(detailType,customAttributeType,customAttributeName,1,customText);
                     }
                 });
             })
        }
    }

    /**
     * This function is allow to save the template after updating some component
     */
    saveTemplate(){
        cy.get(this.#saveTemplate).click({force:true});
    }
}

export const visualJsonEditorPO= new VisualJsonEditorPO();

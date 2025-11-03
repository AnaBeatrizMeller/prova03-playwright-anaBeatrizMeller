import { Page, expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import ContatoEmpresaElements from '../elements/FormularioEmpresaElements';
import BasePage from './BasePage';
import { ai } from '@zerostep/playwright';

export default class ContatoEmpresaPage extends BasePage {
    readonly contatoEmpresaElements: ContatoEmpresaElements;
  
    constructor(readonly page: Page) {
      super(page);
      this.contatoEmpresaElements = new ContatoEmpresaElements(page);
    }
  
    async preencherCamposValidos(): Promise<void> {
      await this.contatoEmpresaElements.getCampoNome().fill(faker.person.fullName());
      await this.contatoEmpresaElements.getCampoEmail().fill(faker.internet.email());
      await this.contatoEmpresaElements.getCampoCargo().fill(faker.person.jobTitle());
      await this.contatoEmpresaElements.getCampoTelefone().fill(faker.phone.number());
      await this.contatoEmpresaElements.getCampoEmpresa().fill(faker.company.name());
      await this.contatoEmpresaElements.getCampoSegmento().selectOption({ label: 'Trading' });
    }
    
  
    async enviarFormulario(): Promise<void> {
      await this.contatoEmpresaElements.getBotaoEnviar().click();
    }
  
    async validarErroEnvio(): Promise<void> {
      await expect(this.contatoEmpresaElements.getMensagemErroEmail()).toBeVisible();
      await expect(this.contatoEmpresaElements.getMensagemSucesso()).not.toBeVisible({ timeout: 5000 }); 
  }
  
    async validarEnvio(): Promise<void> {
      await expect(this.contatoEmpresaElements.getMensagemSucesso()).toBeVisible();
    }
  
    async preencherSemNome(): Promise<void> {
    
    await this.contatoEmpresaElements.getCampoEmail().fill(faker.internet.email({ provider: 'yahoo.com' })); 
    await this.contatoEmpresaElements.getCampoCargo().fill(faker.person.jobTitle());
    await this.contatoEmpresaElements.getCampoTelefone().fill(faker.phone.number());
    await this.contatoEmpresaElements.getCampoEmpresa().fill(faker.company.name());
    await this.contatoEmpresaElements.getCampoSegmento().selectOption({ label: 'Trading' });
  }
  
  async validarRejeicaoNomeVazio(): Promise<void> {
    
    await expect(this.contatoEmpresaElements.getMensagemSucesso()).not.toBeVisible({ timeout: 5000 });
  
  }
  
  async validarCamposObrigatoriosComIA(): Promise<void> {
      const aiArgs = { page: this.page, test };
  
      await ai(`verifique se os rótulos "Nome", "Email corporativo", "Cargo", 
                "Telefone" e "Empresa" contêm um asterisco indicando que são obrigatórios.`, aiArgs);
  
     }
    async preencherCamposSemTelefone(): Promise<void> {
      const nomeEmpresa = faker.company.name();
      const emailCorporativo = faker.internet.email({ 
          provider: nomeEmpresa.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com.br' 
      });
  
      await this.contatoEmpresaElements.getCampoNome().fill(faker.person.fullName());
      await this.contatoEmpresaElements.getCampoEmail().fill(emailCorporativo);
      await this.contatoEmpresaElements.getCampoCargo().fill(faker.person.jobTitle());    
      await this.contatoEmpresaElements.getCampoEmpresa().fill(nomeEmpresa);
      await this.contatoEmpresaElements.getCampoSegmento().selectOption({ label: 'Trading' });
  }
  
  async validarRejeicaoTelefoneVazio(): Promise<void> {
      await expect(this.contatoEmpresaElements.getMensagemErroTelefoneVazio()).toBeVisible();
      await expect(this.contatoEmpresaElements.getMensagemSucesso()).not.toBeVisible({ timeout: 5000 });
    }

}
  
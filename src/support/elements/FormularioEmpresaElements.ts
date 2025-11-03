import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class  ContatoEmpresaElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }


  getCampoNome(): Locator {
    return this.page.locator('input[name="name"]');
  }

  getCampoEmail(): Locator {
    return this.page.locator('input[name="email"]');
  }

  getCampoCargo(): Locator {
    return this.page.locator('input[name="job_title"]');
  }

  getCampoTelefone(): Locator {
    return this.page.locator('input[name="personal_phone"]');
  }

  getCampoEmpresa(): Locator {
    return this.page.locator('input[name="company"]');
  }

  getCampoSegmento(): Locator {
    return this.page.locator('select[name="cf_segmento"]');
  }


  getBotaoEnviar(): Locator {
  return this.page.locator('button:has-text("Enviar"), input[type="submit"]:has-text("Enviar")');
}

    getMensagemErroEmail(): Locator {
  return this.page.locator('text=Insira um endereço de email corporativo.');
    }
    
    getMensagemSucesso(): Locator {
    return this.page.locator('text=Mensagem enviada com sucesso!').nth(0);
  }
    
  getMensagemErroNomeVazio(): Locator {
    return this.page.locator('input[name="name"]');
  }
    
  getMensagemErroTelefoneVazio(): Locator {
    return this.page.locator('text=Campo obrigatório').last();
  }

}
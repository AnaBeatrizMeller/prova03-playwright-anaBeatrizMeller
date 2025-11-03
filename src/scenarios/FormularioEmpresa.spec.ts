import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import FormularioEmpresaPage from '../support/pages/FormularioEmpresaPage';


test.describe('Testes funcionais no site da Narwal Sistemas', () => {
    const CONFIG = join(__dirname, '../support/fixtures/config.yml');
    let formularioEmpresaPage: FormularioEmpresaPage;

    const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.formularioEmpresa')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    formularioEmpresaPage = new FormularioEmpresaPage(page);
    await page.goto(BASE_URL);
  });

test('Validar rejeição de formulário de contato com email inválido (NEGATIVO)', async () => {
    await formularioEmpresaPage.preencherCamposValidos(); 
    await formularioEmpresaPage.enviarFormulario();         
    await formularioEmpresaPage.validarErroEnvio();         
  });
})
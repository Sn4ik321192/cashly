import{test,expect}from'@playwright/test';
test('dashboard initializes a budget and records a ride',async({page})=>{
 await page.goto('/cashly/');
 await expect(page.getByRole('heading',{name:'Добро пожаловать в Cashly'})).toBeVisible({timeout:15000});
 await page.getByRole('button',{name:'Сохранить период'}).click();
 await expect(page.getByText('Общий баланс')).toBeVisible();
 await page.getByRole('button',{name:/Проезд/}).click();
 await expect(page.getByText('Транспорт').first()).toBeVisible();
 await expect(page.getByText('Операция добавлена')).toBeVisible();
});
test('transaction modal validates and records an expense',async({page})=>{
 await page.goto('/cashly/');
 await expect(page.getByRole('heading',{name:'Добро пожаловать в Cashly'})).toBeVisible({timeout:15000});
 await page.getByRole('button',{name:'Сохранить период'}).click();
 await page.getByRole('button',{name:'Добавить операцию'}).click();
 await page.getByPlaceholder('0.00').fill('10.50');
 await page.getByRole('button',{name:'Покупки'}).click();
 await page.getByRole('button',{name:'Сохранить операцию'}).click();
 await expect(page.getByText('Покупки').first()).toBeVisible();
});
test('savings goals, calendar and lazy analytics work on a phone viewport',async({page})=>{
 await page.goto('/cashly/');
 await expect(page.getByRole('heading',{name:'Добро пожаловать в Cashly'})).toBeVisible({timeout:15000});
 await page.getByRole('button',{name:'Сохранить период'}).click();
 await page.getByRole('button',{name:'Цели',exact:true}).click();
 await page.getByRole('button',{name:'Новая цель'}).click();
 await page.getByPlaceholder('Например, отпуск').fill('Отпуск');
 await page.getByPlaceholder('0.00').fill('500');
 await page.getByRole('button',{name:'Создать копилку'}).click();
 await page.getByRole('button',{name:/Пополнить/}).click();
 await page.getByPlaceholder('0.00').fill('50');
 await page.getByRole('button',{name:'Перевести в копилку'}).click();
 await expect(page.getByText(/накоплено/)).toBeVisible();
 await page.getByRole('button',{name:'Календарь'}).click();
 await expect(page.getByText('История периодов')).toBeVisible();
 await page.getByRole('button',{name:'Аналитика'}).click();
 await expect(page.getByRole('heading',{name:'Расходы по дням'})).toBeVisible({timeout:10000});
});

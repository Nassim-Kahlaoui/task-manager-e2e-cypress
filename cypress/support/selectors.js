// cypress/support/selectors.js
export const sel = {
  register: {
    username: () => cy.get('[name="username"], #username').first(),
    email:    () => cy.get('[name="email"], input[type="email"]').first(),
    password: () => cy.get('[name="password"], input[type="password"]').first(),
    submit:   () => cy.get('button[type="submit"], input[type="submit"]').first(),
  },
  login: {
    email:    () => cy.get('[name="email"], input[type="email"]').first(),
    password: () => cy.get('[name="password"], input[type="password"]').first(),
    submit:   () => cy.get('button[type="submit"], input[type="submit"]').first(),
  },
  navbar: {
    toggle: () => cy.get('button[aria-controls], [data-collapse-toggle]').first(),
    panel:  () => cy.get('#navbar-default, [role="navigation"]').first(),
    logout: () => cy.contains(/logout|déconnexion/i).first(),
  },
tasks: {
    newBtn:   () => cy.contains(/add.*task|new.*task|create.*task|ajouter.*tâche/i).first(),

  
    title: () =>
      cy.get('#title, [data-testid*="title" i], [name*="title" i], input[placeholder*="title" i], [aria-label*="title" i]')
        .filter(':visible').first()
        .then($el => $el.length
          ? cy.wrap($el)
          : cy.contains('label', /title|titre|task name/i).then($l => {
              const id = $l.attr('for')
              return id ? cy.get('#' + id) : cy.wrap($l).find('input,textarea').first()
            })
        ),

    desc: () =>
      cy.get('#description, [data-testid*="desc" i], [name*="desc" i], textarea[placeholder*="desc" i], [aria-label*="desc" i], textarea')
        .filter(':visible').first(),

    due: () =>
      cy.get('input[type="date"], #due, [data-testid*="date" i], [name*="date" i], input[placeholder*="date" i], [aria-label*="date" i]')
        .filter(':visible').first(),

    priority: () =>
      cy.get('#priority, [data-testid*="priority" i], [name*="priority" i], select')
        .filter(':visible').first(),

    save:  () => cy.get('button[type="submit"], input[type="submit"]').filter(':visible').first(),

    item: (t) =>
      cy.contains(t, { timeout: 15000 }).then($el => {
        const $card = $el.closest('[data-testid="task-item"], [data-test="task-item"], [role="listitem"], li, article, .card, .task-item, .list-item')
        return cy.wrap($card.length ? $card : $el)
      }),

    editBtn:   () => cy.get('[aria-label*="edit" i], [title*="edit" i], button:has(svg)').filter(':visible').first(),
    deleteBtn: () => cy.get('[aria-label*="delete" i], [title*="delete" i], button:has(svg)').filter(':visible').first(),
  },
}
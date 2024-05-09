describe("form submit", () => {
  it("should submit form with correct values", () => {
    cy.visit("http://localhost:5173/");

    cy.get("input[name=fName").type("Mustafa");
    cy.get("input[name=lName").type("Redifoğlu");
    cy.get("input[name=email").type("Mustafa@reqres.in");
    cy.get("input[name=password").type("Mustafa123.");

    cy.get('button[type="submit"]').click();

    cy.contains(".user-id", "User ID").should("be.visible");
  });
  it("should submit form with incorrect values", () => {
    cy.visit("http://localhost:5173/");

    cy.get("input[name=fName").type("Mu");
    cy.get("input[name=lName").type("R");
    cy.get("input[name=email").type("Mustafa@mustafa.in");
    cy.get("input[name=password").type("Mustafa123");

    cy.get('button[type="submit"]').click();

    cy.contains(".error", "First Name must be at least 3 characters").should(
      "be.visible"
    );
    cy.contains(".error", "Last Name must be at least 3 characters").should(
      "be.visible"
    );
    cy.contains(".error", "Please enter a valid email").should("be.visible");
    cy.contains(".error", "Please enter a valid password").should("be.visible");

    cy.contains(".user-id", "User ID").should("not.exist");
  });
});

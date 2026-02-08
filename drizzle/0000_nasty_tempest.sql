CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"productId" uuid NOT NULL,
	"userEmail" varchar(255) NOT NULL,
	"quantity" numeric(5, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" varchar(255) NOT NULL,
	"value" numeric(5, 2) NOT NULL
);

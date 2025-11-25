CREATE TABLE "conversations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "conversations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50),
	"isGroup" boolean
);
--> statement-breakpoint
CREATE TABLE "users_to_conversations" (
	"userId" integer NOT NULL,
	"conversationId" integer NOT NULL,
	CONSTRAINT "users_to_conversations_userId_conversationId_pk" PRIMARY KEY("userId","conversationId")
);
--> statement-breakpoint
ALTER TABLE "users_to_conversations" ADD CONSTRAINT "users_to_conversations_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_conversations" ADD CONSTRAINT "users_to_conversations_conversationId_conversations_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversations"("id") ON DELETE no action ON UPDATE no action;
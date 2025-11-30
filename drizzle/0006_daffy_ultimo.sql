ALTER TABLE "messages" DROP CONSTRAINT "messages_conversation_id_conversations_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_conversations" DROP CONSTRAINT "users_to_conversations_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_conversations" DROP CONSTRAINT "users_to_conversations_conversation_id_conversations_id_fk";
--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "is_group" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_conversations" ADD CONSTRAINT "users_to_conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_conversations" ADD CONSTRAINT "users_to_conversations_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;
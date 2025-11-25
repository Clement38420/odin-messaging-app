ALTER TABLE "users_to_conversations" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "users_to_conversations" RENAME COLUMN "conversationId" TO "conversation_id";--> statement-breakpoint
ALTER TABLE "users_to_conversations" DROP CONSTRAINT "users_to_conversations_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_conversations" DROP CONSTRAINT "users_to_conversations_conversationId_conversations_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_conversations" DROP CONSTRAINT "users_to_conversations_userId_conversationId_pk";--> statement-breakpoint
ALTER TABLE "users_to_conversations" ADD CONSTRAINT "users_to_conversations_user_id_conversation_id_pk" PRIMARY KEY("user_id","conversation_id");--> statement-breakpoint
ALTER TABLE "users_to_conversations" ADD CONSTRAINT "users_to_conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_conversations" ADD CONSTRAINT "users_to_conversations_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE no action ON UPDATE no action;
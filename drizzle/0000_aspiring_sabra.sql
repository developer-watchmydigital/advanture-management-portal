CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"password_hash" text NOT NULL,
	"role" varchar(20) DEFAULT 'superadmin' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "app_users" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"email" text,
	"phone" varchar(20),
	"photo_url" text,
	"login_method" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"tour_id" text,
	"tour_title" text NOT NULL,
	"date" varchar(50) NOT NULL,
	"guest_count" integer DEFAULT 1 NOT NULL,
	"customer_name" text NOT NULL,
	"customer_phone" varchar(25) NOT NULL,
	"pickup_location" text,
	"special_requirements" text,
	"status" varchar(25) DEFAULT 'pending' NOT NULL,
	"payment_mode" varchar(25) DEFAULT 'cod',
	"payment_status" varchar(25) DEFAULT 'pending',
	"amount" integer NOT NULL,
	"advance_paid" integer DEFAULT 0,
	"balance_due" integer DEFAULT 0,
	"razorpay_order_id" text,
	"razorpay_payment_id" text,
	"razorpay_signature" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "casino_packages" (
	"id" text PRIMARY KEY NOT NULL,
	"venue_id" text NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"otpc_worth" integer DEFAULT 0,
	"liquor_type_label" text,
	"drink_categories" jsonb,
	"access_tags" jsonb,
	"age_range" varchar(50),
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "casino_venues" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"effective_date" text,
	"tagline" text,
	"image" text,
	"general_inclusions" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "casino_venues_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cinematic_showcase" (
	"id" integer PRIMARY KEY NOT NULL,
	"video_url" text NOT NULL,
	"badge" text,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"activities" jsonb,
	"stats" jsonb,
	"preview_card" jsonb,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_items" (
	"id" text PRIMARY KEY NOT NULL,
	"tour_slug" varchar(100),
	"tour_title" text,
	"image" text NOT NULL,
	"media_type" varchar(10) DEFAULT 'image',
	"span_class" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_slides" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"badge" text,
	"media_type" varchar(10) NOT NULL,
	"media_url" text NOT NULL,
	"cta_text" text,
	"cta_link" text,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "login_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"user_name" text NOT NULL,
	"user_email" text,
	"user_phone" varchar(20),
	"login_method" varchar(20) NOT NULL,
	"has_booked" boolean DEFAULT false NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"avatar" text,
	"tour_name" text NOT NULL,
	"rating" integer NOT NULL,
	"comment" text NOT NULL,
	"date" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tours" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"title" text NOT NULL,
	"tagline" text,
	"price" integer NOT NULL,
	"original_price" integer NOT NULL,
	"discount" varchar(20),
	"duration" varchar(100) NOT NULL,
	"rating" numeric(3, 2) DEFAULT '4.90',
	"review_count" integer DEFAULT 0,
	"hero_media" text NOT NULL,
	"thumbnails" jsonb NOT NULL,
	"media_gallery" jsonb,
	"videos" jsonb,
	"description" text NOT NULL,
	"places_covered" jsonb NOT NULL,
	"tour_route" text,
	"timings" varchar(100),
	"inclusions" jsonb NOT NULL,
	"exclusions" jsonb,
	"itinerary" jsonb,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tours_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "casino_packages" ADD CONSTRAINT "casino_packages_venue_id_casino_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."casino_venues"("id") ON DELETE cascade ON UPDATE no action;
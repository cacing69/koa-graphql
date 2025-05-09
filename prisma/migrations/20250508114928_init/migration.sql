-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR(26) NOT NULL,
    "user_first_name" VARCHAR(255) NOT NULL,
    "user_last_name" VARCHAR(255),
    "user_email" VARCHAR(255) NOT NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP(3),
    "user_deleted_at" TIMESTAMP(3),
    "user_created_by" VARCHAR(26),
    "user_updated_by" VARCHAR(26),
    "user_deleted_by" VARCHAR(26),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "role_id" VARCHAR(26) NOT NULL,
    "role_name" VARCHAR(255) NOT NULL,
    "role_display_name" VARCHAR(255),
    "role_description" VARCHAR(255),
    "role_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_updated_at" TIMESTAMP(3),
    "role_deleted_at" TIMESTAMP(3),
    "role_created_by" VARCHAR(26),
    "role_updated_by" VARCHAR(26),
    "role_deleted_by" VARCHAR(26),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "permission_id" VARCHAR(26) NOT NULL,
    "permission_name" VARCHAR(255) NOT NULL,
    "permission_display_name" VARCHAR(255),
    "permission_description" VARCHAR(255),
    "permission_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permission_updated_at" TIMESTAMP(3),
    "permission_deleted_at" TIMESTAMP(3),
    "permission_created_by" VARCHAR(26),
    "permission_updated_by" VARCHAR(26),
    "permission_deleted_by" VARCHAR(26),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_permission_id" VARCHAR(26) NOT NULL,
    "role_permission_role_id" VARCHAR(26) NOT NULL,
    "role_permission_permission_id" VARCHAR(26) NOT NULL,
    "role_permission_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_permission_updated_at" TIMESTAMP(3),
    "role_permission_deleted_at" TIMESTAMP(3),
    "role_permission_created_by" VARCHAR(26),
    "role_permission_updated_by" VARCHAR(26),
    "role_permission_deleted_by" VARCHAR(26),

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_permission_id")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "user_permission_id" VARCHAR(26) NOT NULL,
    "user_permission_user_id" VARCHAR(26) NOT NULL,
    "user_permission_permission_id" VARCHAR(26) NOT NULL,
    "user_permission_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_permission_updated_at" TIMESTAMP(3),
    "user_permission_deleted_at" TIMESTAMP(3),
    "user_permission_created_by" VARCHAR(26),
    "user_permission_updated_by" VARCHAR(26),
    "user_permission_deleted_by" VARCHAR(26),

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("user_permission_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" VARCHAR(26) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "post_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_updated_at" TIMESTAMP(3),
    "post_deleted_at" TIMESTAMP(3),
    "post_created_by" VARCHAR(26),
    "post_updated_by" VARCHAR(26),
    "post_deleted_by" VARCHAR(26),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_permission_role_id_fkey" FOREIGN KEY ("role_permission_role_id") REFERENCES "roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_permission_permission_id_fkey" FOREIGN KEY ("role_permission_permission_id") REFERENCES "permissions"("permission_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_permission_user_id_fkey" FOREIGN KEY ("user_permission_user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_permission_permission_id_fkey" FOREIGN KEY ("user_permission_permission_id") REFERENCES "permissions"("permission_id") ON DELETE RESTRICT ON UPDATE CASCADE;

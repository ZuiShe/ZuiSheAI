-- 为 ON CONFLICT 补上唯一约束（PG 16 DO块兼容写法）
DO $$ BEGIN
  ALTER TABLE "inner_category" ADD CONSTRAINT "uk_inner_category_name_parent" UNIQUE ("name", "parent_id");
EXCEPTION WHEN duplicate_table THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "company" ADD CONSTRAINT "uk_company_company_name" UNIQUE ("company_name");
EXCEPTION WHEN duplicate_table THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "category" ADD CONSTRAINT "uk_category_cat_name" UNIQUE ("cat_name");
EXCEPTION WHEN duplicate_table THEN NULL;
END $$;

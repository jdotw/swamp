﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Org.Repository;

#nullable disable

namespace Org.Migrations
{
    [DbContext(typeof(OrgDbContext))]
    partial class OrgDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Base.Entities.ParameterBase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_date");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("discriminator");

                    b.Property<int?>("ParentId")
                        .HasColumnType("integer")
                        .HasColumnName("parent_id");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_date");

                    b.HasKey("Id")
                        .HasName("pk_parameter_base");

                    b.HasIndex("ParentId")
                        .HasDatabaseName("ix_parameter_base_parent_id");

                    b.ToTable("ParameterBase");

                    b.HasDiscriminator<string>("Discriminator").HasValue("ParameterBase");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Org.Entities.LevelAssignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_date");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("end_date");

                    b.Property<int>("LevelId")
                        .HasColumnType("integer")
                        .HasColumnName("level_id");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer")
                        .HasColumnName("role_id");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_date");

                    b.HasKey("Id")
                        .HasName("pk_level_assignments");

                    b.HasIndex("LevelId")
                        .HasDatabaseName("ix_level_assignments_level_id");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_level_assignments_role_id");

                    b.ToTable("level_assignments", (string)null);
                });

            modelBuilder.Entity("Org.Entities.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_date");

                    b.Property<string>("ExternalId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("external_id");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("last_name");

                    b.Property<string>("MiddleNames")
                        .HasColumnType("text")
                        .HasColumnName("middle_names");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_date");

                    b.HasKey("Id")
                        .HasName("pk_persons");

                    b.ToTable("persons", (string)null);
                });

            modelBuilder.Entity("Org.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset?>("ClosedAtDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("closed_at_date");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_date");

                    b.Property<DateTimeOffset>("OpenFromDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("open_from_date");

                    b.Property<int?>("RoleTypeId")
                        .HasColumnType("integer")
                        .HasColumnName("role_type_id");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_date");

                    b.HasKey("Id")
                        .HasName("pk_roles");

                    b.HasIndex("RoleTypeId")
                        .HasDatabaseName("ix_roles_role_type_id");

                    b.ToTable("roles", (string)null);
                });

            modelBuilder.Entity("Org.Entities.RoleAssignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_date");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("end_date");

                    b.Property<int>("PersonId")
                        .HasColumnType("integer")
                        .HasColumnName("person_id");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer")
                        .HasColumnName("role_id");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_date");

                    b.HasKey("Id")
                        .HasName("pk_role_assignments");

                    b.HasIndex("PersonId")
                        .HasDatabaseName("ix_role_assignments_person_id");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_role_assignments_role_id");

                    b.ToTable("role_assignments", (string)null);
                });

            modelBuilder.Entity("Org.Entities.RoleType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("ActiveFromDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("active_from_date");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_date");

                    b.Property<int?>("ParentId")
                        .HasColumnType("integer")
                        .HasColumnName("parent_id");

                    b.Property<DateTimeOffset?>("RetiredAtDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("retired_at_date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_date");

                    b.HasKey("Id")
                        .HasName("pk_role_types");

                    b.HasIndex("ParentId")
                        .HasDatabaseName("ix_role_types_parent_id");

                    b.ToTable("role_types", (string)null);
                });

            modelBuilder.Entity("Org.Entities.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_date");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<DateTimeOffset?>("DisbandedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("disbanded_date");

                    b.Property<DateTimeOffset>("FormedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("formed_date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<int?>("ParentId")
                        .HasColumnType("integer")
                        .HasColumnName("parent_id");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("type");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_date");

                    b.HasKey("Id")
                        .HasName("pk_teams");

                    b.HasIndex("ParentId")
                        .HasDatabaseName("ix_teams_parent_id");

                    b.ToTable("teams", (string)null);
                });

            modelBuilder.Entity("Org.Entities.Level", b =>
                {
                    b.HasBaseType("Base.Entities.ParameterBase");

                    b.Property<DateTimeOffset>("ActiveFromDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("active_from_date");

                    b.Property<string>("ExternalId")
                        .HasColumnType("text")
                        .HasColumnName("external_id");

                    b.Property<int>("Index")
                        .HasColumnType("integer")
                        .HasColumnName("index");

                    b.Property<string>("IndividualContributorTitle")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("individual_contributor_title");

                    b.Property<string>("ManagerTitle")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("manager_title");

                    b.Property<DateTimeOffset>("RetiredAtDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("retired_at_date");

                    b.HasDiscriminator().HasValue("Level");
                });

            modelBuilder.Entity("Base.Entities.ParameterBase", b =>
                {
                    b.HasOne("Base.Entities.ParameterBase", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .HasConstraintName("fk_parameter_base_parameter_base_parent_id");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Org.Entities.LevelAssignment", b =>
                {
                    b.HasOne("Org.Entities.Level", "Level")
                        .WithMany("LevelAssignments")
                        .HasForeignKey("LevelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_level_assignments_parameter_base_level_id");

                    b.HasOne("Org.Entities.Role", "Role")
                        .WithMany("LevelAssignments")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_level_assignments_roles_role_id");

                    b.Navigation("Level");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Org.Entities.Role", b =>
                {
                    b.HasOne("Org.Entities.RoleType", "RoleType")
                        .WithMany("Roles")
                        .HasForeignKey("RoleTypeId")
                        .HasConstraintName("fk_roles_role_types_role_type_id");

                    b.Navigation("RoleType");
                });

            modelBuilder.Entity("Org.Entities.RoleAssignment", b =>
                {
                    b.HasOne("Org.Entities.Person", "Person")
                        .WithMany("RoleAssignments")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_assignments_persons_person_id");

                    b.HasOne("Org.Entities.Role", "Role")
                        .WithMany("RoleAssignments")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_assignments_roles_role_id");

                    b.Navigation("Person");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Org.Entities.RoleType", b =>
                {
                    b.HasOne("Org.Entities.RoleType", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("fk_role_types_role_types_parent_id");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Org.Entities.Team", b =>
                {
                    b.HasOne("Org.Entities.Team", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .HasConstraintName("fk_teams_teams_parent_id");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Base.Entities.ParameterBase", b =>
                {
                    b.Navigation("Children");
                });

            modelBuilder.Entity("Org.Entities.Person", b =>
                {
                    b.Navigation("RoleAssignments");
                });

            modelBuilder.Entity("Org.Entities.Role", b =>
                {
                    b.Navigation("LevelAssignments");

                    b.Navigation("RoleAssignments");
                });

            modelBuilder.Entity("Org.Entities.RoleType", b =>
                {
                    b.Navigation("Children");

                    b.Navigation("Roles");
                });

            modelBuilder.Entity("Org.Entities.Team", b =>
                {
                    b.Navigation("Children");
                });

            modelBuilder.Entity("Org.Entities.Level", b =>
                {
                    b.Navigation("LevelAssignments");
                });
#pragma warning restore 612, 618
        }
    }
}

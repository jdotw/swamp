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

            modelBuilder.HasSequence("ParameterBaseSequence");

            modelBuilder.Entity("Base.Entities.ParameterBase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValueSql("nextval('\"ParameterBaseSequence\"')");

                    NpgsqlPropertyBuilderExtensions.UseSequence(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("ActiveFromDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("ParentId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("RetiredAtDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable((string)null);

                    b.UseTpcMappingStrategy();
                });

            modelBuilder.Entity("Org.Entities.Capability", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("ActiveFromDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("CapabilityTypeId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset?>("RetiredAtDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CapabilityTypeId");

                    b.HasIndex("RoleId");

                    b.ToTable("Capabilities");
                });

            modelBuilder.Entity("Org.Entities.Deployment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CapabilityId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("DeploymentTypeId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("TeamId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CapabilityId");

                    b.HasIndex("DeploymentTypeId");

                    b.HasIndex("TeamId");

                    b.ToTable("Deployments");
                });

            modelBuilder.Entity("Org.Entities.HomeAssignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CapabilityId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("TeamId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CapabilityId");

                    b.HasIndex("TeamId");

                    b.ToTable("HomeAssignments");
                });

            modelBuilder.Entity("Org.Entities.ManagerAssignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("ManagerId")
                        .HasColumnType("integer");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("ManagerId");

                    b.HasIndex("RoleId");

                    b.ToTable("ManagerAssignments");
                });

            modelBuilder.Entity("Org.Entities.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ExternalId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("MiddleNames")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("Org.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("CareerTrack")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset?>("ClosedAtDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("OpenFromDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("RoleTypeId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("RoleTypeId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Org.Entities.RoleAssignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("PersonId")
                        .HasColumnType("integer");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleAssignments");
                });

            modelBuilder.Entity("Org.Entities.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset?>("DisbandedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("FormedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("ParentId")
                        .HasColumnType("integer");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Org.Entities.TitleAssignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset?>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("TitleId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("TitleId");

                    b.ToTable("TitleAssignments");
                });

            modelBuilder.Entity("Org.Entities.CapabilityType", b =>
                {
                    b.HasBaseType("Base.Entities.ParameterBase");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("RoleTypeId")
                        .HasColumnType("integer");

                    b.HasIndex("ParentId");

                    b.HasIndex("RoleTypeId");

                    b.ToTable("CapabilityTypes");
                });

            modelBuilder.Entity("Org.Entities.DeploymentType", b =>
                {
                    b.HasBaseType("Base.Entities.ParameterBase");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasIndex("ParentId");

                    b.ToTable("DeploymentTypes");
                });

            modelBuilder.Entity("Org.Entities.Level", b =>
                {
                    b.HasBaseType("Base.Entities.ParameterBase");

                    b.Property<string>("ExternalId")
                        .HasColumnType("text");

                    b.Property<int>("Index")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasIndex("ParentId");

                    b.ToTable("Levels");
                });

            modelBuilder.Entity("Org.Entities.RoleType", b =>
                {
                    b.HasBaseType("Base.Entities.ParameterBase");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasIndex("ParentId");

                    b.ToTable("RoleTypes");
                });

            modelBuilder.Entity("Org.Entities.Title", b =>
                {
                    b.HasBaseType("Base.Entities.ParameterBase");

                    b.Property<int>("LevelId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("TrackId")
                        .HasColumnType("integer");

                    b.HasIndex("LevelId");

                    b.HasIndex("TrackId");

                    b.ToTable("Titles");
                });

            modelBuilder.Entity("Org.Entities.Track", b =>
                {
                    b.HasBaseType("Base.Entities.ParameterBase");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasIndex("ParentId");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("Org.Entities.Capability", b =>
                {
                    b.HasOne("Org.Entities.CapabilityType", "CapabilityType")
                        .WithMany()
                        .HasForeignKey("CapabilityTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Org.Entities.Role", "Role")
                        .WithMany("Capabilities")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CapabilityType");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Org.Entities.Deployment", b =>
                {
                    b.HasOne("Org.Entities.Capability", "Capability")
                        .WithMany("Deployments")
                        .HasForeignKey("CapabilityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Org.Entities.DeploymentType", "DeploymentType")
                        .WithMany()
                        .HasForeignKey("DeploymentTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Org.Entities.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Capability");

                    b.Navigation("DeploymentType");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Org.Entities.HomeAssignment", b =>
                {
                    b.HasOne("Org.Entities.Capability", "Capability")
                        .WithMany("HomeAssignments")
                        .HasForeignKey("CapabilityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Org.Entities.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Capability");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Org.Entities.ManagerAssignment", b =>
                {
                    b.HasOne("Org.Entities.Role", "Manager")
                        .WithMany()
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Org.Entities.Role", "Role")
                        .WithMany("ManagerAssignments")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Manager");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Org.Entities.Role", b =>
                {
                    b.HasOne("Org.Entities.RoleType", "RoleType")
                        .WithMany("Roles")
                        .HasForeignKey("RoleTypeId");

                    b.Navigation("RoleType");
                });

            modelBuilder.Entity("Org.Entities.RoleAssignment", b =>
                {
                    b.HasOne("Org.Entities.Person", "Person")
                        .WithMany("RoleAssignments")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Org.Entities.Role", "Role")
                        .WithMany("RoleAssignments")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Org.Entities.Team", b =>
                {
                    b.HasOne("Org.Entities.Team", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Org.Entities.TitleAssignment", b =>
                {
                    b.HasOne("Org.Entities.Role", "Role")
                        .WithMany("TitleAssignments")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Org.Entities.Title", "Title")
                        .WithMany()
                        .HasForeignKey("TitleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("Title");
                });

            modelBuilder.Entity("Org.Entities.CapabilityType", b =>
                {
                    b.HasOne("Org.Entities.CapabilityType", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");

                    b.HasOne("Org.Entities.RoleType", "RoleType")
                        .WithMany("CapabilityTypes")
                        .HasForeignKey("RoleTypeId");

                    b.Navigation("Parent");

                    b.Navigation("RoleType");
                });

            modelBuilder.Entity("Org.Entities.DeploymentType", b =>
                {
                    b.HasOne("Org.Entities.DeploymentType", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Org.Entities.Level", b =>
                {
                    b.HasOne("Org.Entities.Level", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Org.Entities.RoleType", b =>
                {
                    b.HasOne("Org.Entities.RoleType", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Org.Entities.Title", b =>
                {
                    b.HasOne("Org.Entities.Level", "Level")
                        .WithMany("Titles")
                        .HasForeignKey("LevelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Org.Entities.Track", "Track")
                        .WithMany()
                        .HasForeignKey("TrackId");

                    b.Navigation("Level");

                    b.Navigation("Track");
                });

            modelBuilder.Entity("Org.Entities.Track", b =>
                {
                    b.HasOne("Org.Entities.Track", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Org.Entities.Capability", b =>
                {
                    b.Navigation("Deployments");

                    b.Navigation("HomeAssignments");
                });

            modelBuilder.Entity("Org.Entities.Person", b =>
                {
                    b.Navigation("RoleAssignments");
                });

            modelBuilder.Entity("Org.Entities.Role", b =>
                {
                    b.Navigation("Capabilities");

                    b.Navigation("ManagerAssignments");

                    b.Navigation("RoleAssignments");

                    b.Navigation("TitleAssignments");
                });

            modelBuilder.Entity("Org.Entities.Team", b =>
                {
                    b.Navigation("Children");
                });

            modelBuilder.Entity("Org.Entities.CapabilityType", b =>
                {
                    b.Navigation("Children");
                });

            modelBuilder.Entity("Org.Entities.DeploymentType", b =>
                {
                    b.Navigation("Children");
                });

            modelBuilder.Entity("Org.Entities.Level", b =>
                {
                    b.Navigation("Children");

                    b.Navigation("Titles");
                });

            modelBuilder.Entity("Org.Entities.RoleType", b =>
                {
                    b.Navigation("CapabilityTypes");

                    b.Navigation("Children");

                    b.Navigation("Roles");
                });

            modelBuilder.Entity("Org.Entities.Track", b =>
                {
                    b.Navigation("Children");
                });
#pragma warning restore 612, 618
        }
    }
}

---
title: 'Home Lab'
description: 'A project to build an OSS-based distributed computing environment step by step, using multiple VMs on a single Ubuntu host'
---

## Overview

I run multiple virtual machines (VMs) on a single Ubuntu host and combine Slurm, Enroot, Ray, Apache Spark, Apache Iceberg and other tools into an OSS-based distributed computing environment.

Through this project, I learn the following technologies step by step:

1. Resource management and job scheduling for HPC clusters with Slurm
2. Running containers with Enroot and Pyxis
3. Distributed computing and distributed optimization with Ray
4. Distributed reinforcement learning with RLlib
5. Distributed data processing with Apache Spark
6. Building a lakehouse with Apache Iceberg and MinIO
7. Integrating the systems so that data processed with Spark is used for training and optimization with Ray

## OSS used

| Category | OSS | Main use |
|---|---|---|
| Continuous optimization | SciPy | BFGS, L-BFGS-B, SLSQP, etc. |
| Mathematical optimization modeling | Pyomo | LP, MILP, NLP, etc. |
| Convex optimization | CVXPY | Formulating convex optimization problems |
| Linear / mixed-integer optimization | HiGHS | LP, QP, MILP |
| Nonlinear optimization | Ipopt | Continuous nonlinear optimization |
| Mixed-integer optimization | SCIP | MILP, MINLP, etc. |
| Evolutionary computation | pymoo | GA, NSGA-II, NSGA-III, etc. |
| Evolutionary computation | DEAP | GA, genetic programming, etc. |
| Hyperparameter optimization | Optuna | Search and trial management |
| Distributed task execution | Ray | Parallel processing of candidate solutions and objective functions |
| Distributed process communication | MPI | Communication between multiple processes |
| Cluster resource management | Slurm | Allocating nodes, CPUs and GPUs |

## Role of each layer

| Layer | OSS | Role |
|---|---|---|
| Virtualization | KVM / QEMU / libvirt | Creating and managing virtual machines |
| Cluster Scheduler | Slurm | Allocating resources such as CPUs, memory and nodes |
| Container Runtime | Enroot | Running container images |
| Slurm Container Integration | Pyxis | Integrating Slurm with Enroot |
| Distributed Computing | Ray / MPI | Distributed task execution and inter-process communication |
| Distributed RL | RLlib | Distributed reinforcement learning |
| Experiment Management | Ray Tune / Optuna | Parallelizing trials and parameter search |
| Optimization | SciPy / Pyomo / CVXPY / pymoo / DEAP | Formulating optimization problems and algorithms |
| Solvers | HiGHS / Ipopt / SCIP | Solving mathematical optimization problems |
| Data Processing | Apache Spark | Distributed ETL, SQL and aggregation |
| Table Format | Apache Iceberg / Delta Lake | Managing lakehouse tables |
| Object Storage | MinIO | S3-compatible object storage |

## Clusters

| Cluster | Nodes | Main functions |
|---|---|---|
| Compute / AI Cluster | controller, compute1, compute2 | Slurm, Ray, AI training, RLlib |
| Distributed Optimization Cluster | Uses the existing Compute Cluster | Ray, MPI, SciPy, Pyomo, pymoo, etc. |
| Data / Spark Cluster | spark-master, spark-worker1, spark-worker2 | Distributed ETL, SQL, data analysis |
| Lakehouse Services | lakehouse | MinIO, Apache Iceberg REST Catalog |

## Final VM configuration

| VM | vCPU | RAM | Purpose |
|---|---:|---:|---|
| controller | 1 | 3GB | Slurm controller |
| compute1 | 3 | 8GB | Slurm + Enroot + Pyxis + Ray |
| compute2 | 3 | 8GB | Slurm + Enroot + Pyxis + Ray |
| spark-master | 1 | 4GB | Spark Master / Driver |
| spark-worker1 | 3 | 8GB | Spark Worker / Executor |
| spark-worker2 | 3 | 8GB | Spark Worker / Executor |
| lakehouse | 1 | 6GB | MinIO + Iceberg REST Catalog |
| **VM total** | **15** | **45GB** | **7 VMs** |
| Host memory | — | about 19GB | Ubuntu / KVM / page cache, etc. |

**Note:** The Distributed Optimization Cluster is a logical cluster that shares the compute resources of the existing Compute / AI Cluster, so it needs no additional VMs.

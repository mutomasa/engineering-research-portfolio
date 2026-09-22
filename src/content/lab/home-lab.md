---
title: 'Home Lab'
description: 'Ubuntuホスト1台に複数のVMを構築し、OSSベースの分散計算環境を段階的に構築するプロジェクト'
---

## 自宅Labの概要

Ubuntuホストマシン1台に複数の仮想マシン（VM）を構築し、Slurm、Enroot、Ray、Apache Spark、Apache Icebergなどを組み合わせた、OSSベースの分散計算環境を構築する。

本プロジェクトでは、次の技術を段階的に学習する。

1. SlurmによるHPCクラスタの資源管理とジョブスケジューリング
2. EnrootとPyxisによるコンテナ実行
3. Rayによる分散計算・分散最適化
4. RLlibによる分散強化学習
5. Apache Sparkによる分散データ処理
6. Apache IcebergとMinIOによるLakehouse構築
7. Sparkで処理したデータをRayで学習・最適化するシステム連携

## 利用するOSS

| 分類 | OSS | 主な用途 |
|---|---|---|
| 連続最適化 | SciPy | BFGS、L-BFGS-B、SLSQPなど |
| 数理最適化モデリング | Pyomo | LP、MILP、NLPなど |
| 凸最適化 | CVXPY | 凸最適化問題の定式化 |
| 線形・混合整数最適化 | HiGHS | LP、QP、MILP |
| 非線形最適化 | Ipopt | 連続非線形最適化 |
| 混合整数最適化 | SCIP | MILP、MINLPなど |
| 進化計算 | pymoo | GA、NSGA-II、NSGA-IIIなど |
| 進化計算 | DEAP | GA、遺伝的プログラミングなど |
| ハイパーパラメータ最適化 | Optuna | 探索・試行管理 |
| 分散タスク実行 | Ray | 候補解・評価関数の並列処理 |
| 分散プロセス通信 | MPI | 複数プロセス間の通信 |
| クラスタ資源管理 | Slurm | ノード・CPU・GPUの割当 |

## 各レイヤの役割

| レイヤ | OSS | 役割 |
|---|---|---|
| Virtualization | KVM / QEMU / libvirt | 仮想マシンの作成と管理 |
| Cluster Scheduler | Slurm | CPU・メモリ・ノードなどの資源割当 |
| Container Runtime | Enroot | コンテナイメージの実行 |
| Slurm Container Integration | Pyxis | SlurmとEnrootの連携 |
| Distributed Computing | Ray / MPI | 分散タスク実行・プロセス間通信 |
| Distributed RL | RLlib | 分散強化学習 |
| Experiment Management | Ray Tune / Optuna | 試行の並列化・パラメータ探索 |
| Optimization | SciPy / Pyomo / CVXPY / pymoo / DEAP | 最適化問題の定式化とアルゴリズム |
| Solvers | HiGHS / Ipopt / SCIP | 数理最適化問題の求解 |
| Data Processing | Apache Spark | 分散ETL・SQL・集計 |
| Table Format | Apache Iceberg / Delta Lake | Lakehouseのテーブル管理 |
| Object Storage | MinIO | S3互換オブジェクトストレージ |

## クラスタの区分

| クラスタ | 構成 | 主な機能 |
|---|---|---|
| Compute / AI Cluster | controller、compute1、compute2 | Slurm、Ray、AI学習、RLlib |
| Distributed Optimization Cluster | 既存のCompute Clusterを利用 | Ray、MPI、SciPy、Pyomo、pymooなど |
| Data / Spark Cluster | spark-master、spark-worker1、spark-worker2 | 分散ETL、SQL、データ分析 |
| Lakehouse Services | lakehouse | MinIO、Apache Iceberg REST Catalog |

## VMの最終構成

| VM | vCPU | RAM | 用途 |
|---|---:|---:|---|
| controller | 1 | 3GB | Slurm controller |
| compute1 | 3 | 8GB | Slurm + Enroot + Pyxis + Ray |
| compute2 | 3 | 8GB | Slurm + Enroot + Pyxis + Ray |
| spark-master | 1 | 4GB | Spark Master / Driver |
| spark-worker1 | 3 | 8GB | Spark Worker / Executor |
| spark-worker2 | 3 | 8GB | Spark Worker / Executor |
| lakehouse | 1 | 6GB | MinIO + Iceberg REST Catalog |
| **VM合計** | **15** | **45GB** | **7台** |
| ホスト側のメモリ | — | 約19GB | Ubuntu / KVM / ページキャッシュなど |

**補足：** Distributed Optimization Clusterは既存のCompute / AI Clusterの計算資源を共用する論理クラスタであり、追加のVMは必要ない。

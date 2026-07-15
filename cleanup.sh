#!/bin/bash
aws ecr delete-repository --repository-name vtu-results --force --region ap-south-1 || true
aws ecr delete-repository --repository-name vtu-backend --force --region ap-south-1 || true

while aws eks describe-nodegroup --cluster-name vtu-results-cluster --nodegroup-name vtu-results-app-nodes --region ap-south-1 2>/dev/null; do
  echo "Waiting for app node group to delete..."
  sleep 30
done

while aws eks describe-nodegroup --cluster-name vtu-results-cluster --nodegroup-name vtu-results-monitoring-nodes --region ap-south-1 2>/dev/null; do
  echo "Waiting for monitoring node group to delete..."
  sleep 30
done

aws eks delete-cluster --name vtu-results-cluster --region ap-south-1 || true
while aws eks describe-cluster --name vtu-results-cluster --region ap-south-1 2>/dev/null; do
  echo "Waiting for cluster to delete..."
  sleep 30
done

aws iam detach-role-policy --role-name vtu-results-eks-cluster-role --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy || true
aws iam delete-role --role-name vtu-results-eks-cluster-role || true

for policy in "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy" "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy" "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly" "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy" "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"; do
  aws iam detach-role-policy --role-name vtu-results-eks-node-role --policy-arn $policy || true
done
aws iam delete-role --role-name vtu-results-eks-node-role || true

aws iam detach-role-policy --role-name vtu-results-lbc-role --policy-arn arn:aws:iam::938500344509:policy/vtu-results-AWSLoadBalancerControllerIAMPolicy || true
aws iam delete-role --role-name vtu-results-lbc-role || true
aws iam delete-policy --policy-arn arn:aws:iam::938500344509:policy/vtu-results-AWSLoadBalancerControllerIAMPolicy || true

aws iam detach-role-policy --role-name vtu-results-ebs-csi-role --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy || true
aws iam delete-role --role-name vtu-results-ebs-csi-role || true

echo "CLEANUP FINISHED"

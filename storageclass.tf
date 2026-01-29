resource "kubernetes_storage_class_v1" "azure_disk_sc" {
  metadata {
    name = "azure-disk-sc"
  }
  storage_provisioner = "kubernetes.io/azure-disk"
  parameters = {
    storageaccounttype = "Standard_LRS"
    kind               = "managed"
  }
  reclaim_policy      = "Retain"
  volume_binding_mode = "WaitForFirstConsumer"
  depends_on = [ azurerm_kubernetes_cluster.aks ]
}
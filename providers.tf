terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.57.0"
    }
  }
}

provider "azurerm" {
  # Configuration options
  features {}
  subscription_id = "d008c7cc-9795-4292-bf79-74ae52cda63d"
}
provider "kubernetes" {
  host = azurerm_kubernetes_cluster.aks.kube_admin_config[0].host
  client_certificate = base64decode(azurerm_kubernetes_cluster.aks.kube_admin_config[0].client_certificate)
  client_key = base64decode(azurerm_kubernetes_cluster.aks.kube_admin_config[0].client_key)
  cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.aks.kube_admin_config[0].cluster_ca_certificate)
}
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "labs-aks"
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = "labsaks"
  default_node_pool {
    name                        = "nodepool1"
    node_count                  = 1
    vm_size                     = "Standard_A2_v2"
    temporary_name_for_rotation = "tempnp"
  }
  identity {
    type = "SystemAssigned"
  }
  network_profile {
    network_plugin = "azure"
  }
}
output "vm_name" {
  value = azurerm_linux_virtual_machine.vm.name
}
output "aks_name" {
  value = azurerm_kubernetes_cluster.aks.name
}
## opcua_binary-create_sessions_debug.pac
##
## OPCUA Binary Protocol Analyzer
##
## Debug code for processing the create session service.
##
## Author:   Kent Kvarfordt
## Contact:  kent.kvarfordt@inl.gov
##
## Copyright (c) 2022 Battelle Energy Alliance, LLC.  All rights reserved.

%header{
    void printOpcUaNodeId(int indent_width, OpcUA_NodeId *nodeId);
    void printOpcUaNodeId_TwoByte(int indent_width, OpcUA_NodeId_TwoByte *nodeId);
    void printOpcUaNodeId_FourByte(int indent_width, OpcUA_NodeId_FourByte *nodeId);
    void printOpcUaNodeId_Numeric(int indent_width, OpcUA_NodeId_Numeric *nodeId);
    void printOpcUaNodeId_String(int indent_width, OpcUA_NodeId_String *nodeId);
    void printOpcUaNodeId_Guid(int indent_width, OpcUA_NodeId_Guid *nodeId);
    void printOpcUaNodeId_Opaque(int indent_width, OpcUA_NodeId_Opaque *nodeId);
%}

%code{
    void printExpandedNodeID(int indent_width, OpcUA_ExpandedNodeId *nodeId) {
        uint8_t encoding = nodeId->node_id()->identifier_type();

        node_id_encoding = encoding & 0x0f
        bool has_server_idx = isBitSet(nodeId->node_id()->identifier_type(), ServerIndexFlag);
        bool has_namespace_uri = isBitSet(nodeId->node_id()->identifier_type(), NamespaceUriFlag);

        if (node_id_encoding == node_encoding::TwoByte) {
            printf("%s EncodingMask: TwoByte (0x%02x)\n", indent(indent_width).c_str(), node_encoding::TwoByte);
            if (has_server_idx) {
                printf("%s has server index: True\n", indent(indent_width + 1).c_str());
            } else {
                printf("%s has server index: False\n", indent(indent_width + 1).c_str());
            }
            if (has_namespace_uri) {
                printf("%s has namespace uri: True\n", indent(indent_width + 1).c_str());
            } else {
                printf("%s has namespace uri: False\n", indent(indent_width + 1).c_str());
            }
            printOpcUaNodeId_TwoByte(indent_width, nodeId->node_id()->two_byte_numeric());
            
        } else if (node_id_encoding == node_encoding::FourByte) {
            printf("%s EncodingMask: FourByte (0x%02x)\n", indent(indent_width).c_str(), node_encoding::FourByte);
            if (has_server_idx) {
                printf("%s has server index: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has server index: False\n", indent(indent_width).c_str());
            }
            if (has_namespace_uri) {
                printf("%s has namespace uri: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has namespace uri: False\n", indent(indent_width).c_str());
            }
            printOpcUaNodeId_FourByte(indent_width, nodeId->node_id()->four_byte_numeric());

        } else if (node_id_encoding == node_encoding::Numeric) {
            printf("%s EncodingMask: Numeric (0x%02x)\n", indent(indent_width).c_str(), node_encoding::Numeric);
            if (has_server_idx) {
                printf("%s has server index: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has server index: False\n", indent(indent_width).c_str());
            }
            if (has_namespace_uri) {
                printf("%s has namespace uri: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has namespace uri: False\n", indent(indent_width).c_str());
            }
            printOpcUaNodeId_Numeric(indent_width, nodeId->node_id()->numeric());

        } else if (node_id_encoding == node_encoding::String) {
            printf("%s EncodingMask: String (0x%02x)\n", indent(indent_width).c_str(), node_encoding::String);
            if (has_server_idx) {
                printf("%s has server index: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has server index: False\n", indent(indent_width).c_str());
            }
            if (has_namespace_uri) {
                printf("%s has namespace uri: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has namespace uri: False\n", indent(indent_width).c_str());
            }
            printOpcUaNodeId_String(indent_width, nodeId->node_id()->string());

        } else if (node_id_encoding == node_encoding::GUID) {
            printf("%s EncodingMask: GUID (0x%02x)\n", indent(indent_width).c_str(), node_encoding::GUID);
            if (has_server_idx) {
                printf("%s has server index: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has server index: False\n", indent(indent_width).c_str());
            }
            if (has_namespace_uri) {
                printf("%s has namespace uri: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has namespace uri: False\n", indent(indent_width).c_str());
            }
            printOpcUaNodeId_Guid(indent_width, nodeId->node_id()->guid());

        } else if (node_id_encoding == node_encoding::Opaque) {
            printf("%s EncodingMask: Opaque (0x%02x)\n", indent(indent_width).c_str(), node_encoding::Opaque);
            if (has_server_idx) {
                printf("%s has server index: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has server index: False\n", indent(indent_width).c_str());
            }
            if (has_namespace_uri) {
                printf("%s has namespace uri: True\n", indent(indent_width).c_str());
            } else {
                printf("%s has namespace uri: False\n", indent(indent_width).c_str());
            }
            printOpcUaNodeId_Opaque(indent_width, nodeId->node_id()->opaque());
        }
        if (has_namespace_uri){
            printf("%s NamespaceUri: %s\n", indent(indent_width).c_str(), std_str(nodeId->namespace_uri()->string()).c_str());
        }
        if (has_server_idx){
            printf("%s ServerIndex: %d\n", indent(indent_width).c_str(), nodeId->server_idx());
        }
    }


    void printOpcUaNodeId(int indent_width, OpcUA_NodeId *nodeId) {
        uint8_t encoding = nodeId->identifier_type();

        if (encoding == node_encoding::TwoByte) {
            printf("%s EncodingMask: TwoByte (0x%02x)\n", indent(indent_width).c_str(), node_encoding::TwoByte);
            printOpcUaNodeId_TwoByte(indent_width, nodeId->two_byte_numeric());
            
        } else if (encoding == node_encoding::FourByte) {
            printf("%s EncodingMask: FourByte (0x%02x)\n", indent(indent_width).c_str(), node_encoding::FourByte);
            printOpcUaNodeId_FourByte(indent_width, nodeId->four_byte_numeric());

        } else if (encoding == node_encoding::Numeric) {
            printf("%s EncodingMask: Numeric (0x%02x)\n", indent(indent_width).c_str(), node_encoding::Numeric);
            printOpcUaNodeId_Numeric(indent_width, nodeId->numeric());

        } else if (encoding == node_encoding::String) {
            printf("%s EncodingMask: String (0x%02x)\n", indent(indent_width).c_str(), node_encoding::String);
            printOpcUaNodeId_String(indent_width, nodeId->string());

        } else if (encoding == node_encoding::GUID) {
            printf("%s EncodingMask: GUID (0x%02x)\n", indent(indent_width).c_str(), node_encoding::GUID);
            printOpcUaNodeId_Guid(indent_width, nodeId->guid());

        } else if (encoding == node_encoding::Opaque) {
            printf("%s EncodingMask: Opaque (0x%02x)\n", indent(indent_width).c_str(), node_encoding::Opaque);
            printOpcUaNodeId_Opaque(indent_width, nodeId->opaque());
        }
    }

    void printOpcUaNodeId_TwoByte(int indent_width, OpcUA_NodeId_TwoByte *nodeId) {
        printf("%s Identifier Numeric: %d\n", indent(indent_width).c_str(), nodeId->numeric());
    }

    void printOpcUaNodeId_FourByte(int indent_width, OpcUA_NodeId_FourByte *nodeId) {
        printf("%s Namespace Index: %d\n", indent(indent_width).c_str(), nodeId->namespace_index());
        printf("%s Identifier Numeric: %d\n", indent(indent_width).c_str(), nodeId->numeric());
    }

    void printOpcUaNodeId_Numeric(int indent_width, OpcUA_NodeId_Numeric *nodeId) {
        printf("%s Namespace Index: %d\n", indent(indent_width).c_str(), nodeId->namespace_index());
        printf("%s Identifier Numeric: %d\n", indent(indent_width).c_str(), nodeId->numeric());
    }

    void printOpcUaNodeId_String(int indent_width, OpcUA_NodeId_String *nodeId) {
        printf("%s Namespace Index: %d\n", indent(indent_width).c_str(), nodeId->namespace_index());
        printf("%s Identifier String: %s\n", indent(indent_width).c_str(), std_str(nodeId->string()->string()).c_str());
    }

    void printOpcUaNodeId_Guid(int indent_width, OpcUA_NodeId_Guid *nodeId) {
        printf("%s Namespace Index: %d\n", indent(indent_width).c_str(), nodeId->namespace_index());

        OpcUA_Guid *guid_ptr = nodeId->guid();
        string guid_str = guidToGuidstring(guid_ptr->data1(), guid_ptr->data2(), guid_ptr->data3(), guid_ptr->data4());
        printf("%s Identifier Guid: %s\n", indent(indent_width).c_str(), guid_str.c_str());
    }

    void printOpcUaNodeId_Opaque(int indent_width, OpcUA_NodeId_Opaque *nodeId) {
        printf("%s Namespace Index: %d\n", indent(indent_width).c_str(), nodeId->namespace_index());
        printf("%s Identifier Opaque: %s\n", indent(indent_width).c_str(), bytestringToHexstring(nodeId->opaque()->byteString()).c_str());
    }
%}
